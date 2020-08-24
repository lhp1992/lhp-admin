<template>
  <lhp-form-row :gutter="30">
    <el-collapse :value="['1', '2']">
      <el-collapse-item title="常用条件" name="1">
        <lhp-form-col label="活动名称">
          <el-input size="small" v-model="form.name"></el-input>
        </lhp-form-col>
        
        <lhp-form-col label="活动区域">
          <el-select size="small" v-model="form.region" placeholder="请选择活动区域" style="width: 100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </lhp-form-col>

        <lhp-form-col label="活动时间">
          <el-row :gutter="0">
            <el-col :span="11">
              <el-date-picker size="small" type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center;">-</el-col>
            <el-col :span="11">
              <el-time-picker size="small" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-row>
        </lhp-form-col>

        <lhp-form-col label="活动名称">
          <el-input size="small" v-model="form.name"></el-input>
        </lhp-form-col>

        <lhp-form-col label="活动名称" :span="24">
          <el-input size="small" type="textarea" v-model="form.desc"></el-input>
        </lhp-form-col>                
      </el-collapse-item>
      <el-collapse-item title="其他条件" name="2">
        <lhp-form-col label="活动名称">
          <el-input size="small" v-model="form.name"></el-input>
        </lhp-form-col>
        
        <lhp-form-col label="活动区域">
          <el-select size="small" v-model="form.region" placeholder="请选择活动区域" style="width: 100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </lhp-form-col>

        <lhp-form-col label="活动时间">
          <el-row :gutter="0">
            <el-col :span="11">
              <el-date-picker size="small" type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center;">-</el-col>
            <el-col :span="11">
              <el-time-picker size="small" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-row>
        </lhp-form-col>

        <lhp-form-col label="活动名称">
          <el-input size="small" v-model="form.name"></el-input>
        </lhp-form-col>

        <lhp-form-col label="活动名称" :span="24">
          <el-input size="small" type="textarea" v-model="form.desc"></el-input>
        </lhp-form-col>                
      </el-collapse-item>
    </el-collapse>
  </lhp-form-row>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    }
  }
};
</script>