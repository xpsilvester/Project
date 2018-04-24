function findRoutes(routes) {
  var firstIndex;
  for(var i=0;i<routes.length;i++){
    if(selectFirst(routes[i],routes)){
      firstIndex=i;
    }
  }
  var result=routes[firstIndex][0]+","+routes[firstIndex][1];
  result=concatRoute(firstIndex,routes,result);
  return result;
}
function selectFirst(first,routes){
  for(var j=0;j<routes.length;j++){
    if(first[0] == routes[j][1]){
      return false;
    }
  }
  return true;
}
function concatRoute(index,routes,results){
  var flag;
  for(var q=0;q<routes.length;q++){
    if(routes[index][1]==routes[q][0]){
      results+=","+routes[q][1];
      arguments.callee(q,routes,results);
      flag=1;
      break;
    }
    console.log(results);
  }
  
}
findRoutes([["MNL", "TAG"], ["CEB", "TAC"], ["TAG", "CEB"], ["BOR","SER"],["TAC", "BOR"]]);
