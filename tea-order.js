var teaOrder = function(){
  var total_count = parseInt(document.getElementById('no_of_tea').value);
  var preference_count = parseInt(document.getElementById('preference_count').value);
  var green_tea = parseInt(document.getElementById('green_tea').value);
  var black_tea = parseInt(document.getElementById('black_tea').value);

  var output = document.getElementById('order');
  var order = "";
  //Boredom is a flag variable which is set whenever the conditions are violated
  var boredom = 0,change_tea = 0;
  (green_tea > black_tea)?(highest = green_tea, lowest = black_tea, first = "green", second = "black"):(highest = black_tea, lowest = green_tea, first = "black", second = "green");

  //Magnitude is the difference of green and black tea with respect to prefernce count of user.
  var magnitude = highest/preference_count - lowest/preference_count;

  /*checking if total no of chai bags and green + black tea sums up and also checking if magnitude is not lesser than 0 and not greater than one
  so there is no need to drink more than k tea of same type in one interval*/
  if(total_count != green_tea+black_tea || (magnitude < 0 || magnitude > 1) ){
    boredom = 1;
  } else {
    while (total_count > 0) {
      var times = 0;
      //change tea is an interval point for changing between teas once k times reached in one particular tea or tea is finished
      if(!(change_tea++%2)){
        times = (highest < preference_count || lowest == 0)?times = highest:times = preference_count;
        order += whatIDrunk(first,times);
        highest -= times;
      } else {
        times = (lowest < preference_count)?times = lowest:times = preference_count;
        order += whatIDrunk(second,times);
        lowest -= times;
      }
      total_count -= times;
      //once lowest tea finishes and highest tea still have more than k numbers left
      if(lowest == 0  && (times != preference_count && highest>preference_count)){
        console.log(highest,lowest,times);
        boredom = 1;
        break;
      }
    }

  }
  if(boredom){
    output.innerText = "Impossible";
  } else{
    output.innerText = order;
  }
}

// Function for repeating string n times, or to generate n times of prefered tea
var whatIDrunk = function(tea_type,times){
  var my_drink = "";
  while(times--){
    my_drink += tea_type+" ";
  }
  return my_drink;
}
