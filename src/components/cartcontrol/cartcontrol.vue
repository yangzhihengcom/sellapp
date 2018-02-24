<!--  -->
<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease " v-show="food.count > 0" @click="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
export default {
  data () {
    return {
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        console.log('click')
        this.food.count++
      }
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}

</script>
<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
  font-size 0
  .cart-decrease
    display inline-block
    padding 6px
    &.move-enter-to, &.move-leave-active
      opacity 1
      transition all .5s linear
      transform translate3d(0,0,0)
      .inner
        display inline-block
        line-height 24px
        font-size 24px
        color rgb(0,160,220)
        transition all .4s linear
        transform rotate(0)
    &.move-enter,&.move-leave-to
      opacity 0
      transform translate3d(24px,0,0)
      .inner
        transform rotate(180deg)
    .inner
      display inline-block
      line-height 24px
      font-size 24px
      color rgb(0,160,220)
      transition all .4s linear
      transform rotate(0)
  .cart-count
    display inline-block
    font-size 10px
    vertical-align top
    width 12px
    padding-top 6px
    line-height 24px
    text-align center
    color rgb(147,153,159)
  .cart-add
    display inline-block
    color rgb(0,160,220)
    padding 6px
    line-height 24px
    font-size 24px
</style>
