export let recorder = {
  data(){
  	return {
  		recorder: null,
      isRecording: false
  	}
  },
  mounted(){
  	try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      window.URL = window.URL || window.webkitURL;
      
      var audio_context = new AudioContext;
    } catch (e) {
      console.log('No web audio support in this browser!');
    }

    var self = this
    function getMediaSuccess(stream){
      self.mediaStream = stream
      var input = audio_context.createMediaStreamSource(stream);
      self.recorder = new Recorder(input);
      self.onGetMedia && self.onGetMedia()
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      }).then((stream) => {
        getMediaSuccess(stream)
      }).catch((e) => {
        console.log('No web audio support in this browser!');
      })
    } else {
      navigator.getUserMedia({
        audio: true,
        video: false
      }, (stream) => {
        getMediaSuccess(stream)
      }, function (e) {
        console.log('No web audio support in this browser!');
      })
    }
  },
  beforeDestroy(){
    this.recorderCallback = null
    this.stopRecording()
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(e => {
        e.stop()
      })
    }
  },
  methods: {
  	startRecording() {
      this.stopRecording()
      this.onStartRecording && this.onStartRecording()
      this.isRecording = true
	    this.recorder && this.recorder.record();
	  },
	  stopRecording() {
      if (this.isRecording) {
        this.recorder && this.recorder.stop();
        this.createDownloadLink();
        this.recorder.clear();
      }
    },
    createDownloadLink() {
      this.recorder && this.recorder.exportWAV((blob) => {
        this.isRecording = false
        this.onStopRecording && this.onStopRecording(blob)
	    	// this.recorderCallback && this.recorderCallback(blob)
	    });
	  }
  }
};
