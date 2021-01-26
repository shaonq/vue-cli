<template>
  <div class="__calendar">
    <!-- 工具条 -->
    <div class="__calendar-head">
      <div class="__calendar-flex">
        <div>
          <span v-if="renderType==='week'">
            <button class="u-btn u-btn--default" @click="activeDay=$date.addDays(-7,activeDay)" title="上一周">上一周</button>
            <button class="u-btn u-btn--default" @click="activeDay=$date.addDays(7,activeDay)" title="下一周">下一周</button>
          </span>
          <span v-else-if="renderType==='day'">
            <button class="u-btn u-btn--default" @click="activeDay=$date.addDays(-1,activeDay)" title="上一天">上一天</button>
            <button class="u-btn u-btn--default" @click="activeDay=$date.addDays(1,activeDay)" title="下一天">下一天</button>
          </span>
          <span v-else>
            <button class="u-btn u-btn--default" @click="activeDay=$date.addMonths(-1,activeDay)" title="上一月">上一月</button>
            <button class="u-btn u-btn--default" @click="activeDay=$date.addMonths(1,activeDay)" title="下一月">下一月</button>
          </span>
          <div class="__calendar-head__title">{{getYear(activeDay)}}年{{getMonth(activeDay)}}月</div>
          <button class="u-btn u-btn--default" @click="activeDay=toDay">今日</button>
        </div>
        <div class="__calendar-flex__item">
          <slot></slot>
        </div>
        <div>
          <span class="u-btn__group">
            <button class="u-btn" :class="{'u-btn--default':renderType!=='month','u-btn--blue':renderType==='month','u-btn--primary':renderType==='month'}" @click="renderType='month'">月</button>
            <button class="u-btn" :class="{'u-btn--default':renderType!=='week','u-btn--blue':renderType==='week','u-btn--primary':renderType==='week'}" @click="renderType='week'">周</button>
            <button class="u-btn" :class="{'u-btn--default':renderType!=='day','u-btn--blue':renderType==='day','u-btn--primary':renderType==='day'}" @click="renderType='day'">日</button>
          </span>
        </div>
      </div>
    </div>
    <!-- 面板区 -->
    <div class="__calendar-body">
      <!-- 周面板 -->
      <table class="__calendar-week" v-if="renderType==='week'">
        <tr class="__calendar__thead">
          <td>星期日</td>
          <td>星期一</td>
          <td>星期二</td>
          <td>星期三</td>
          <td>星期四</td>
          <td>星期五</td>
          <td>星期六</td>
        </tr>
        <tr>
          <td v-for="(ymd,index) in weekList" :key="index">
            <div class="__calendar-item" :class='{
                  "__calendar-item-show": getMonth(ymd) === getMonth(activeDay),
                  "__calendar-item-active": getMonth(ymd) === getMonth(activeDay) && getDay(ymd) === getDay(activeDay),
                  "__calendar-item-today":  getDay(ymd) === getDay(toDay),
               }'>
              <div class="__calendar-item-mask" @click="activeDay=ymd,$emit('on-day',ymd,$event)"></div>
              <!-- 显示当日 -->
              <div class="__calendar-item-hd" :class="{'__calendar-item-holiday':getHoliday(ymd,true),'__calendar-item-holidayweek':getHoliday(ymd,false)}" @click="activeDay=ymd,$emit('on-day',ymd,$event)">{{getDay(ymd)}}
                {{toLunar(ymd)}}
              </div>
              <!-- 显示条目 -->
              <div class="__calendar-item-bd">
                <template v-for="(item,index) in getItems[ymd]">
                  <div class="__calendar-title" :class='item._className' :title="item.title+item.content" :key="index" @click="$emit('on-item',ymd,item._source,$event)">
                    <cite>{{item._hm}}</cite> {{item.title}}</div>
                </template>
              </div>
              <!-- 触发查看所有条目 -->
              <div v-if="getItems[ymd].length>20" class="__calendar-item-fd" @click="activeDay=ymd,renderType='day'">
                查看全部{{index}}条记录
              </div>
            </div>
          </td>
        </tr>
      </table>
      <!-- 日面板 -->
      <table class="__calendar-day" v-else-if="renderType==='day'">
        <tr class="__calendar__thead">
          <td>
            <div class="__calendar-flex">
              <div class="__calendar-flex__item">
                {{activeDay}} 星期{{["日","一","二","三","四","五","六"][$date.toDate(activeDay).getDay()]}}
                {{dayLunar(activeDay)}}
              </div>
              <div style="color:#888;font-size:12px"> 共 {{getItems[activeDay].length}} 条数据</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <!-- __calendar-item-active -->
            <div class="__calendar-item  __calendar-item-active" :class='{"__calendar-item-today":  getDay(activeDay) === getDay(toDay)}' style="overflow: auto">
              <div class="__calendar-item-mask" @click="$emit('on-day',activeDay,$event)"></div>
              <!-- 显示条目 -->
              <div class="__calendar-item-bd">
                <div class="__calendar-title" v-for="(item,index) in getItems[activeDay]" :key="index" @click="$emit('on-item',activeDay,item._source,$event)">{{item.title}}<br />{{item.content}}</div>
              </div>
            </div>
          </td>
        </tr>
      </table>
      <!-- 月面板 -->
      <table class="__calendar-month" v-else>
        <tr class="__calendar__thead">
          <td>星期日</td>
          <td>星期一</td>
          <td>星期二</td>
          <td>星期三</td>
          <td>星期四</td>
          <td>星期五</td>
          <td>星期六</td>
        </tr>
        <tr v-for="(week,key) in monthList" :key="key">
          <td v-for="(ymd,index) in week" :key="index">
            <div class="__calendar-item" :class='{
                  "__calendar-item-show": getMonth(ymd) === getMonth(activeDay),
                  "__calendar-item-active": getMonth(ymd) === getMonth(activeDay) && getDay(ymd) === getDay(activeDay),
                  "__calendar-item-today":  getDay(ymd) === getDay(toDay),
               }'>
              <div class="__calendar-item-mask" @click="activeDay=ymd,$emit('on-day',ymd,$event)"></div>
              <!-- 显示当日 -->
              <div class="__calendar-item-hd" :class="{'__calendar-item-holiday':getHoliday(ymd,true),'__calendar-item-holidayweek':getHoliday(ymd,false)}" @click.stop="activeDay=ymd,$emit('on-day',ymd,$event)">{{getDay(ymd)}}
                {{toLunar(ymd)}}
              </div>
              <!-- 显示条目 -->
              <div class="__calendar-item-bd">
                <div v-for="(item,index) in getItems[ymd].slice(0,4)" :key="index">
                  <div class="__calendar-title" :class='item._className' :title="item.title+item.content" :key="index" @click="$emit('on-item',ymd,item._source,$event)"><cite>{{item._hm}}</cite> {{item.title}}</div>
                </div>
              </div>
              <!-- 触发查看所有条目 -->
              <div v-if="getItems[ymd].length>4" class="__calendar-item-fd" @click="activeDay=ymd,renderType='day'">
                查看全部{{getItems[ymd].length}}条记录
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>

  </div>
</template>

<script>
import index from './index.js'
export default index
</script>