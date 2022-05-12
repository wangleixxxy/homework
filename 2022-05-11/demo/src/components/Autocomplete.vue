<template>
  <div class="wrap">
    <p>测试：apple</p>
    <input
      class="inp"
      :disabled="disabled"
      :class="{ error: error }"
      :placeholder="placeholder"
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
      @input="handleChange"
      :value="value"
      type="text"
    />
    <ul v-show="value" class="list">
      <li v-for="item in list" :key="item.id">{{ item.val }}</li>
    </ul>
  </div>
</template>

<script>
const originalList = [
  {
    id: 1,
    val: 'Apple',
  },
  {
    id: 2,
    val: 'orange',
  },
  {
    id: 3,
    val: 'pineapple',
  },
  {
    id: 4,
    val: 'banana',
  },
  {
    id: 5,
    val: 'peach',
  },
];
export default {
  data() {
    return {
      disabled: false,
      error: false,
      placeholder: '请输入...',
      value: '',
      list: [],
    };
  },
  methods: {
    handleComposition(event) {
      if (event.type === 'compositionend') {
        this.isOnComposition = false;
        this.handleChange(event);
      } else {
        this.isOnComposition = true;
      }
    },
    handleChange(event) {
      let value = event.target.value;
      if (!this.isOnComposition) {
        this.getData(value);
      }
    },
    getData(value) {
      this.value = value;
      value = value.trim().toLowerCase();
      let list = [];
      for (let i = 0; i < originalList.length; i++) {
        if (originalList[i].val.toLowerCase().indexOf(value) > -1) {
          list.push(originalList[i]);
        }
      }
      this.list = list;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul,
li {
  list-style: none;
}
.wrap {
  margin-top: 60px;
  width: 300px;
}
.inp {
  width: 200px;
}
.list {
  width: 200px;
}
.list li {
  height: 30px;
  font-size: 16px;
  line-height: 30px;
  text-align: left;
}
</style>
