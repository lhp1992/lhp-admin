<template>
  <lhp-grid-page-item>
    <template slot="title">
      流程提醒
    </template>
    <ul class="ant-list-items">
      <li class="ant-list-item">
        <div class="ant-list-item-meta">
          <div class="ant-list-item-meta-avatar">
            <span class="ant-avatar ant-avatar-circle ant-avatar-image">
              <i class="el-icon-s-order"></i>
            </span>
          </div>
          <div class="ant-list-item-meta-content">
            <div class="ant-list-item-meta-title">流程超时</div>
            <div class="ant-list-item-meta-description">
              您有3个流程超时
            </div>
          </div>
        </div>
      </li>
      <li class="ant-list-item">
        <div class="ant-list-item-meta">
          <div class="ant-list-item-meta-avatar">
            <span class="ant-avatar ant-avatar-circle ant-avatar-image">
              <i class="el-icon-s-order"></i>
            </span>
          </div>
          <div class="ant-list-item-meta-content">
            <div class="ant-list-item-meta-title">流程超时</div>
            <div class="ant-list-item-meta-description">
              您有3个流程超时
            </div>
          </div>
        </div>
      </li>
      <li class="ant-list-item">
        <div class="ant-list-item-meta">
          <div class="ant-list-item-meta-avatar">
            <span class="ant-avatar ant-avatar-circle ant-avatar-image">
              <i class="el-icon-s-order"></i>
            </span>
          </div>
          <div class="ant-list-item-meta-content">
            <div class="ant-list-item-meta-title">流程超时</div>
            <div class="ant-list-item-meta-description">
              您有3个流程超时
            </div>
          </div>
        </div>
      </li>
      <li class="ant-list-item">
        <div class="ant-list-item-meta">
          <div class="ant-list-item-meta-avatar">
            <span class="ant-avatar ant-avatar-circle ant-avatar-image">
              <i class="el-icon-s-order"></i>
            </span>
          </div>
          <div class="ant-list-item-meta-content">
            <div class="ant-list-item-meta-title">流程超时</div>
            <div class="ant-list-item-meta-description">
              您有3个流程超时
            </div>
          </div>
        </div>
      </li>
      <li class="ant-list-item">
        <div class="ant-list-item-meta">
          <div class="ant-list-item-meta-avatar">
            <span class="ant-avatar ant-avatar-circle ant-avatar-image">
              <i class="el-icon-s-order"></i>
            </span>
          </div>
          <div class="ant-list-item-meta-content">
            <div class="ant-list-item-meta-title">流程超时</div>
            <div class="ant-list-item-meta-description">
              您有3个流程超时
            </div>
          </div>
        </div>
      </li>
    </ul>
  </lhp-grid-page-item>
</template>

<style lang="scss" scoped>
  .ant-list-item {
    border-bottom: 1px solid $borderSolidColor;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    color: $textColor;
  }
  .ant-list-item-meta {
    display: flex;
    flex: 1;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    max-width: 100%;
  }
  .ant-list-item-meta-avatar {
    margin-right: 16px;
  }
  .ant-avatar {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    -webkit-font-feature-settings: 'tnum';
    font-feature-settings: 'tnum';
    position: relative;
    display: inline-block;
    overflow: hidden;
    color: #fff;
    white-space: nowrap;
    text-align: center;
    vertical-align: middle;
    background: #ccc;
    width: 32px;
    height: 32px;
    line-height: 32px;
    border-radius: 50%;
  }
  .ant-avatar > img {
    display: block;
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
  }
  .ant-list-item-meta-content {
    -webkit-box-flex: 1;
    -ms-flex: 1 0;
    flex: 1 0;
    width: 0;
    color: $textColor;
  }
  .ant-list-item-meta-title {
    margin-bottom: 4px;
    color: $textColor;
    font-size: 14px;
    line-height: 1.5;
  }
  .ant-list-item-meta-description {
    color: $textColorLight;
    font-size: 12px;
    line-height: 1.5;
  }
</style>

<style lang="scss" scoped>
  .ant-list-item-meta {
    align-items: center;
  }
  .ant-list-item-meta-avatar {
    margin-left: 16px;
  }
</style>
