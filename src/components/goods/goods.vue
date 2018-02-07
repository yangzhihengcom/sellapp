<!--  -->
<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods" :key="item.id" class="menu-item border-1px">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="item in goods" class="foods-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="description">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellerCount}}</span>
                  <span>好评率{{food.rating}}</span>
                </div>
                <div class="price">
                  <span>￥{{food.price}}</span>
                  <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Number
    }
  },
  data() {
    return {
      goods: []
    }
  },
  created() {   
    this.$http.get('/api/goods').then((response) => {
      response = response.body
      if (response.erron === ERR_OK) {
        this.goods = response.data
        console.log(this.goods)
      }
    }),
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}

</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin';
  .goods
    display flex
    position absolute
    top 174px
    bottom 64px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        margin 0 auto
        line-height 14px
        border-1px(rgba(7,17,27,0.1))
        .text
          display table-cell
          vertical-align middle
          width 56px
          font-size 12px
          .icon
            display inline-block
            vertical-align top
            width 14px
            height 14px
            margin-right 2px
            background-size 14px 14px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.special
              bg-image('special_3')
            &.invoice
              bg-image('invoice_3')
  .foods-wrapper
      flex 1
</style>
