<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="banner">
          <h2>Tôi học code</h2>
          <h5>Website học thuật toán miễn phí, giúp bạn nâng cao tư duy lập trình và giải thuật.</h5>
          <br />
          <router-link :to="{path:'/problem'}">
            <span class="btn-link">Luyện tập ngay</span>
          </router-link>
        </div>
      </div>

      <div class="col-md-12">
        <h3>Hướng dẫn làm bài tập</h3>
        <div class="break-line"></div>
        <br />
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Chào mừng các bạn đến với phần
          hướng dẫn làm bài tập. Mỗi bài tập bao gồm phần source code do người dùng thực
          hiện và file input đầu vào (input.txt) tương ứng với mỗi bài tập. Nhiệm vụ của
          người dùng là phải đọc file input để lấy dữ liệu đầu vào và thực hiện theo yêu
          cầu của bài tập.
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Người dùng có thể chọn
          một trong 3 ngôn ngữ lập trình đó là: Java, Python, C/C++. Trong quá trình
          thực hiện bài tập cần phải tuân thủ theo theo khuôn mẫu của từng ngôn ngữ lập
          trình như bên dưới. Chúc các bạn học vui.
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <vue-code-highlight>{{example.java}}</vue-code-highlight>
      </div>
      <div class="col-md-12">
        <vue-code-highlight>{{example.python}}</vue-code-highlight>
      </div>
      <div class="col-md-12">
        <vue-code-highlight>{{example.cpp}}</vue-code-highlight>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import { component as VueCodeHighlight } from "vue-code-highlight";

export default {
  components: {
    VueCodeHighlight
  },
  data() {
    return {
      example: {
        java: `public class Main {
    private static Scanner sc = new Scanner(System.in);

    //code your function here ...

    public static void main(String[] args) {
        System.setIn(new FileInputStream("input.txt"));

        //read file input and code your logic here ...
    }
}`,
        python: `def main():
    pass

if __name__ == '__main__':
    main()
        `,
        cpp: `#include <iostream>
using namespace std;

//code your function here ...

int main()
{
    //.................
    return 0;
}
`
      }
    };
  }
};
</script>

<style scoped>
.break-line {
  height: 2px;
  width: 50%;
  border-top: 2px solid rgb(1, 97, 141);
}

.banner {
  background: #337ab7;
  color: #fff;
  text-align: center;
  padding: 30px 30px 60px 30px;
}

.banner h2,
.banner h5 {
  font-weight: 580;
}

.banner .btn-link {
  background: #fff;
  color: #337ab7;
  font-size: 20px;
  font-weight: bold;
  border-radius: 5px;
}
</style>