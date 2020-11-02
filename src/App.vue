<template>
  <div id="app">
    <table class="table table-bordered">
      <tr>
        <th width="20%">
          <label for="nombre-tarea">Estimated Time in Minutes</label>
          <input
            type="number"
            class="form-control"
            id="time_estimated"
            v-model="time_task"
          />
        </th>
        <th width="60%">
          <label for="nombre-tarea">Conference Name</label>
          <input
            type="text"
            class="form-control"
            id="conference"
            v-model="nombre_taks"
          />
        </th>
        <th width="20%">
          <button
            type="button"
            @click="add_task"
            class="btn btn-xs btn-success"
          >
            Crear +
          </button>
        </th>
      </tr>
    </table>
    <h4>Hora de la proxima conferencia: {{ test }}</h4>
    <table id="lista" class="table table-bordered">
      <thead>
        <tr>
          <th width="5%">#</th>
          <th width="10%">Hora</th>
          <th width="60%">Nombre Conferencia / Duraccion</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(conf, index) in conferencias" v-bind:key="index">
          <th>{{ index + 1 }}</th>
          <td>{{ conf.time_task }}</td>
          <td>{{ conf.nombre_taks }}</td>
          
        </tr>
      </tbody>
    </table>
  </div>
</template>



<script>
export default {
  name: "app",
  data() {
    return {
      test: "00:00",
      conferencias: [],
      horas: [],
      suma: [],
      aux_suma_hora: [],
      boolean: [],
      nombre_taks: "",
      time_task: "",
    };
  },
  methods: {
    add_task() {
      var seg_default = 32400; // '09:00' hora por defecto al iniciar la jornada
      //var bool6 = false;
      var iniciotime = "09:00";

      if (this.conferencias.length === 0) {
        if (this.time_task <= 5) {
          this.msg_error("La conferencia debe ser más de 5 minutos");
        } else {
          this.msg_success("Conferencia ingresada correctamente");

          this.conferencias.push({
            nombre_taks: this.nombre_taks + " / " + this.time_task + " min",
            time_task: iniciotime,
          });

          var new_segun = this.minutos_a_seconds(this.time_task);
          var suma_segu = seg_default + new_segun;

          this.horas.push({ time_task: seg_default });
          this.suma.push(suma_segu);
          this.aux_suma_hora.push(suma_segu);
          this.boolean.push(0);
          this.secondsToString(suma_segu);
          var push_hora = this.secondsToString(suma_segu);
          this.test = push_hora;
          //console.log("------->" + push_hora);
        }
      } else {
        if (this.time_task <= 5) {
          this.msg_error("La conferencia debe ser más de 5 minutos");
        } else {
          var new_horario = this.secondsToString(this.suma[0]);
          var new_segun = this.minutos_a_seconds(this.time_task);
          var suma_segu = this.suma[0] + new_segun;
          var push_hora = this.secondsToString(suma_segu);
          var almuerzo = 43200; //12:00

          if (suma_segu > almuerzo && this.boolean[0] === 0) {
            this.msg_warning(
              "La hora de la Conferencia ingresada supera el horario del almuerzo"
            );
          } else {
            if (suma_segu > 61200) {
              this.msg_warning("Conferencia cerrada");
              this.test = "Cerrada";
            } else {
              this.msg_success("Conferencia ingresada correctamente");
              this.conferencias.push({
                nombre_taks: this.nombre_taks + " / " + this.time_task + " min",
                time_task: new_horario,
              });
              this.test = push_hora;
              if (push_hora === "12:00") {
                this.conferencias.push({
                  nombre_taks: "Almuerzo",
                  time_task: "12:00",
                });
                this.test = "13:00";
                this.boolean.splice(0, 1);
                this.boolean.push(1);

                this.suma.splice(0, 1);

                //var fin_almuerzo = ;
                var suma_segu = 46800;
                this.suma.push(suma_segu);
                
              }

              /*--------------------------------------------*/

              if (suma_segu >= 61200) {
                this.conferencias.push({
                  nombre_taks: "Networking",
                  time_task: "17:00",
                });
                this.boolean.splice(0, 1);
                this.boolean.push(1);

                this.suma.splice(0, 1);
                var suma_segu = 62200;
                this.suma.push(suma_segu);
              }
              console.log("------->" + push_hora);
              this.suma.splice(0, 1);
              this.suma.push(suma_segu);
              
            }
          }
        }
      }
      this.nombre_taks = "";
      this.time_task = "";
    },
    del_task(index) {
      console.log(this.conferencias.length);
      this.horas.splice(index, 1);
      console.log(this.horas);
      this.conferencias.splice(index, 1);
    },

    secondsToString(seconds) {
      var hour = Math.floor(seconds / 3600);
      hour = hour < 10 ? "0" + hour : hour;

      var minute = Math.floor((seconds / 60) % 60);
      minute = minute < 10 ? "0" + minute : minute;

      var second = seconds % 60;
      second = second < 10 ? "0" + second : second;
      // console.log(hour + ':' + minute );

      return hour + ":" + minute;
    },

    minutos_a_seconds(minutos) {
      var segundos = minutos * 60;
      return segundos;
    },

    horas_a_minutos(horas) {
      // creamos una fecha genérica con tu tiempo
      var d = new Date("0001-01-01T" + horas);
      // calculamos los minutos a partir de las horas y minutos de la fecha creada
      var minutos = d.getHours() * 60 + d.getMinutes();
      return minutos;
    },

    msg_success(msg) {
      this.$toast.open({
        message: msg,
        type: "success",
        position: "top",
      });
    },
    msg_error(msg) {
      this.$toast.open({
        message: msg,
        type: "error",
        position: "top",
      });
    },
    msg_warning(msg) {
      this.$toast.open({
        message: msg,
        type: "warning",
        position: "top",
      });
    },
  },
};
</script>
