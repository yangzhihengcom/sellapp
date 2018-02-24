<!--  -->
<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="item.id" class="menu-item border-1px" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="foods-list food-list-hook" :key="item.id">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" :key="food.id">
              <div class="icon">
                <img :src="food.icon" alt="" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="description">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'

const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    }
  },
  computed: {
    // 获得每个fooditem一个高度区间
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height = this.listHeight[i]
        let height1 = this.listHeight[i + 1]
        if (!height1 || (this.scrollY >= height && this.scrollY < height1)) {
          return i
        }
      }
      return 0
    }
  },
  created() {
    this.$http.get('/api/goods').then((response) => {
      response = response.body
      if (response.erron === ERR_OK) {
        this.goods = response.data
        // 异步加载
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      }
    })
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  methods: {
    // 关闭pc端的事件
    selectMenu(index, event) {
      if (!event._constructed) {
        return
      }
      console.log(index)
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el, 1000)
    },
    // 初始化BScroll
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
      // 计算每次点击后Y轴的坐标
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    // 得到每个food的高度
    _calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  components: {
    shopcart: shopcart,
    cartcontrol: cartcontrol
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
        padding 0 12px
        line-height 14px
        text-align center
        &.current
          position relative
          z-index 10
          margin-top -1px
          background #ffffff
          font-weight 700
          .text
            border-none()
        .text
          display table-cell
          vertical-align middle
          border-1px(rgba(7,17,27,0.1))
          font-size 12px
        .icon
          display inline-block
          vertical-align top
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
  .foods-wrapper
    flex 1
    .foods-list
      width:100%
      .title
        width 100%
        font-size 12px
        color rgb(147,153,159)
        line-height 26px
        padding-left 14px
        background #f3f5f7
        border-left 2px solid #d9dde1
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            font-size 14px
            color rgb(7,17,27)
            font-weight 700
            line-height 14px
          .description,.extra
            font-size 10px
            line-height 12px
            color rgb(147,153,159)
          .description
            margin-bottom 8px
          .extra
            line-height 10px
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 18px
              font-size 14px
              color rgb(240,20,20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147,153,159)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 10px
</style>
