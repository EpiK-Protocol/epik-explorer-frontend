<template>
  <div class="footer">
    <div class>
      <div class="container">
        <img class="logo" src="@/assets/image/epik_m_logo.png" />
        <div class="name">{{ $t("header.title") }}</div>
        <div class="sum">{{ $t("banner.t1") }} - {{ $t("banner.t2") }}</div>
      
        <div class="links fx_c">
          <router-link to="/">{{$t("header.nav.home.label")}}</router-link>
          <router-link :to="$t('header.nav.tipset.items[0].index')">{{$t('header.nav.tipset.items[0].label')}}</router-link>
          
          <router-link to="/mining/list">{{$t("header.nav.rank.label")}}</router-link>
          <router-link to="/experts/list">{{$t("header.nav.experts.label")}}</router-link>

          <a href="https://explorer.epik-protocol.io/" target="_blank">{{$t("header.nav.web.label")}}</a>
        </div>
        <div class="line"></div>
        <div class="contact">
          <a target="_blank" href="https://github.com/EpiK-Protocol">
          <img src="@/assets/image/footer/epik_footer_icon1.png" />
          </a>
          <a target="_blank" href="https://www.facebook.com/EpiK-protocol-109006797553557">
            <img src="@/assets/image/footer/epik_footer_icon2.png" />
          </a>
          <a href="https://twitter.com/EpikProtocol 
" target="_blank">
            <img src="@/assets/image/footer/epik_footer_icon3.png" />
          </a>
          <a href="https://www.reddit.com/user/EpiK-Protocol/
" target="_blank">
            <img src="@/assets/image/footer/epik_footer_icon4.png" />
          </a>
          <a href="https://medium.com/epik-protocol" target="_blank">
            <img src="@/assets/image/footer/epik_footer_icon7b.png" style="padding: 5PX;" />
          </a>
          <a href="https://discord.gg/Tz6kZbd" target="_blank">
          <img src="@/assets/image/footer/epik_footer_icon5.png" style="padding: 5PX;"/>
          </a>
          <a href="https://t.me/EpikProtocol" target="_blank">
          <img src="@/assets/image/footer/epik_footer_icon6.png" />
          </a>
        </div>
      </div>
    </div>
    <!-- <div class="copyright">京ICP备13052529号-1 京网文{2016}6081-813号 京B2-20180078 北京卓尔太奇科技有限公司  Copyright 2018 Motion All rights reserved</div> -->
  </div>
</template>
<script>
export default {

};
</script>
<style lang="scss" scoped>
.footer {
  width: 100%;
  // background: #100330;
  padding-bottom: 10px;
  box-sizing: border-box;

  .container {
    width: 1100px;
    text-align: center;
    margin: 0 auto;
    padding-top: 60px;
    padding-bottom: 80px;
    color: white;

    .contact {
      img {
        display: inline-block;
        width: 40px;
        margin: 0 25px;
        box-sizing: border-box;
      }
    }

    .line {
      width: 100%;
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 30px 0;
    }

    .links {
      a {
        color: white;
        margin: 0 10px;
        font-weight: 300;
        font-size: 16px;
      }
    }

    .logo {
      width: 40px;
      display: inline;
    }

    .sum {
      font-size: 30px;
      margin-bottom: 60px;
    }
    .sum1 {
        font-size: 17px;
        margin-bottom: 30px;
      }

    .name {
      color: white;
      font-size: 20px;
      margin-top: 15px;
      margin-bottom: 28px;
    }
  }

  @media screen and (max-width: 800px) {
    .container {
      width: 100%;
      padding-top: 30px;
      padding-bottom: 40px;
      .logo{
        width: 24px;
        margin-bottom: 5px;
      }

      .contact {
        img {
          width: 24px;
          margin: 0 10px;
          box-sizing: border-box;
        }
      }
      .line{
        margin: 15px 0;
      }

      .links {
        
        a {
          color: white;
          margin: 0 10px;
          font-weight: 400;
          font-size: 10px;
        }
      }

      .name {
        font-size: 12px;
        margin-bottom: 15px;
      }

      .sum {
        font-size: 16px;
        margin-bottom: 20px;
      }
      .sum1 {
        font-size: 12px;
        margin-bottom: 15px;
        padding: 0 20px;
        font-weight: 400;
      }
    }
  }

  .copyright {
    font-size: 12px;
    margin-top: 50px;
    color: #555;
  }
}
</style>


