<!--  -->
<template>
  <div class="shopcart">
      <div class="content">
          <div class="content-left">
              <div class="logo-wrapper">
                  <div class="logo" :class="{'highlight':totalCount > 0}">
                      <i class="icon-shopping_cart" :class="{'highlight':totalCount > 0}"></i>
                  </div>
                  <div class="num" v-show="totalCount>0">{{totalCount}}</div>
              </div>
              <div class="price" :class="{'highlight':totalPrice > 0}">￥{{totalPrice}}</div>
              <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
          </div>
          <div class="content-right">
            <div class="pay" :class="payClass">
              {{payDesc}}
            </div>
          </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
    }
  },
  computed: {
    totalPrice() {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount() {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice < this.minPrice) {
        let difff = this.minPrice - this.totalPrice
        return `还差￥${difff}起送`
      } else {
        return '去结算'
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    }
  },
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [
          {
            price: 0,
            count: 0
          }
        ]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  }
}

</script>
<style lang="stylus" rel="stylesheet/stylus">
.shopcart
  position fixed
  left 0
  bottom 0
  background #141d27
  width 100%
  height 48px
  .content
    display flex
    background #141d27
    font-size 0
    .content-left
      flex 1
      .logo-wrapper
        display inline-block
        vertical-align top
        position relative
        top -10px
        width 56px
        height 56px
        margin 0 12px
        padding 6px
        border-radius 50%
        box-sizing border-box
        background #141d27
        .logo
          width 100%
          height 100%
          border-radius 50%
          text-align center
          background rgb(43, 52, 60)
          &.highlight
            background rgb(0, 160, 220)
          .icon-shopping_cart
            font-size 24px
            line-height 44px
            color rgb(128, 133, 138)
            &.highlight
              color #fff
        .num
          position absolute
          top 0
          right 0
          width 24px
          height 16px
          line-height 16px
          text-align center
          border-radius 16px
          font-size 10px
          font-weight 700
          color #ffffff
          background rgb(240,20,20)
          box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
      .price
        display inline-block
        vertical-align top
        margin-top 12px
        padding-right 12px
        box-sizing border-box
        line-height 24px
        font-size 16px
        font-weight 700
        color rgba(255,255,255,0.4)
        border-right 1px solid rgba(255,255,255,0.2)
        &.highlight
          color rgb(255,255,255)
      .desc
        display inline-block
        vertical-align top
        margin-left 12px
        margin-top 12px
        line-height 24px
        font-size 16px
        color rgba(255,255,255,0.4)
    .content-right
      flex 0 0 105px
      width 105px
      .pay
        font-size 12px
        text-align center
        font-weight 700
        line-height 48px
        &.not-enough
          background rgb(43, 52, 59)
          color: rgba(255,255,255,0.4)
        &.enough
          background rgb(0, 180, 60)
          color: #fff
</style>
