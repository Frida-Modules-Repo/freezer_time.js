Java.perform(function () {
      function freeze_funcs(){
          let lrand48_addr = Module.findExportByName("libc.so", "lrand48");
          Interceptor.attach(lrand48_addr, {onLeave: function(retval){retval.replace(7)}});
          //custom time
          let tm_s = 1626403551;
          let tm_us = 5151606;
          let gettimeofday_addr = Module.findExportByName("libc.so", "gettimeofday");
          Interceptor.attach(gettimeofday_addr, {
              onEnter: function(args) {
                  this.tm_ptr = args[0];
              },
              onLeave:function(retval){
                  this.tm_ptr.writeLong(tm_s);
                  this.tm_ptr.add(0x4).writeLong(tm_us);
              }
          });
      }
      freeze_funcs();
});
