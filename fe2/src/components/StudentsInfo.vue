<template>
    <div>
      <div id="table_wrapper" style="width:500px;">
        <template >
          <el-table
            :data="tableData"
            @row-click="showInfo"
            :default-sort="{prop:'id', order:'acsending'}"
            border
            style="width: 100%"
            max-height="250">
            <el-table-column
              fixed
              sortable
              prop="id"
              label="id"
              width="150">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="gender"
              label="性别"
              width="120">
            </el-table-column>
            <el-table-column
              prop="age"
              label="年龄"
              width="120">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机号"
              width="300">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="120">
              <template scope="scope" >
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, tableData)"
                  type="text"
                  size="small">
                  移除
                </el-button>
                <el-button
                  @click.native.prevent="editRow(scope.$index, tableData)"
                  type="text"
                  size="small">
                  编辑
                </el-button>

              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-button type="primary" v-show="prevShow" id="prev" @click="handlePrev">prev</el-button>
        <el-button type="primary" v-show="nextShow" id="next" @click="handleNext">next</el-button>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 200
  export default {
    data() {
      return {
        draw: 1,
        start: 0,
        length: 4,
        nextShow: true,
        prevShow: true,
        tableData: []
      }
    },
    methods: {
      showInfo(row, event, column){
        console.log( column);
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      editRow(index, rows) {
        console.log(rows[index]);
      },
      handlePrev() {
        this.draw++;
        this.start -= this.length;
        this.$http.post('/api/studentsInfo', {
          draw: this.draw,
          start: this.start,
          length: this.length
        }, {emulate: true}).then(function (res) {
          res = res.body
          if (res.code != ERR_OK) {
            alert(res.msg)
          } else {
            this.tableData = res.data
            if (parseInt(this.start)+parseInt(this.length) >= res.total) {
              this.nextShow = false
            }else {
              this.nextShow = true
            }
            if( this.start === 0 ) {
              this.prevShow = false
            }else {
              this.prevShow = true
            }
          }
        })
      },
      handleNext() {
        this.draw++;
        this.start += this.length;
        this.$http.post('/api/studentsInfo', {
          draw: this.draw,
          start: this.start,
          length: this.length
        }, {emulate: true}).then(function (res) {
          res = res.body
          if (res.code != ERR_OK) {
            alert(res.msg)
          } else {
            this.tableData = res.data
            if (parseInt(this.start)+parseInt(this.length) >= res.total) {
              this.nextShow = false
            }else {
              this.nextShow = true
            }
            if( this.start === 0 ) {
              this.prevShow = false
            }else {
              this.prevShow = true
            }
          }
        })
      }
    },
    created() {
      let $self = this;
      this.$http.post('/api/studentsInfo', {
        draw: this.draw,
        start: this.start,
        length: this.length
      }, {emulate: true}).then(function (res) {
        res = res.body
        if (res.code != ERR_OK) {
          alert(res.msg)
        } else {
          this.tableData = res.data
          if (parseInt(this.start)+parseInt(this.length) >= res.total) {
            this.nextShow = false
          }else {
            this.nextShow = true
          }
          if( this.start === 0 ) {
            this.prevShow = false
          }else {
            this.prevShow = true
          }
        }
      })
    }
  }
</script>
