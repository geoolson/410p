const convexHull = require('monotone-convex-hull-2d');

function GetAllAntiPodalPairs(points)
{
  function area(a,b,c)
  {
    const A = points[a];
    const B = points[b];
    const C = points[c];
    const X = 0;
    const Y = 1;
    return Math.abs( ( A[X]*(B[Y]-C[Y]) + B[X]*(C[Y]-A[Y]) + C[X]*(A[Y]-B[Y]) ) / 2 );
  }

  function pointsEqual(a, b)
  {
    return ( (points[a][0] === points[b][0]) && (points[a][1] === points[b][1]) );
  }

  let pairs = [];
  let i0 = points.length - 1;
  let i = 0;
  let j = 1;
  while((j < i0) && area(i,i+1,j+1) > area(i,i+1,j))
  {
    ++j;
  }
  let j0 = j;
  while(j != i0)
  {
    ++i;
    pairs.push([points[i], points[j]]);
    while(area(i,i+1,j+1) > area(i,i+1,j))
    {
      ++j;
      if(i !== j0 && j !== i0)
        pairs.push([points[i], points[j]]);
      else
        return pairs;
    }
    if( area(j, i+1, j+1) === area(i, i+1, j) )
    {
      if(!pointsEqual(i, j0) && !pointsEqual(j, i0))
        pairs.push([points[i], points[j+1]]);
      else 
        pairs.push([points[i+1], points[j]]);
    }
  }
  return pairs;
}

var seed = 22188;
function randPoints(){
  function random() {
    let x = Math.sin(seed++) * 10000;
    let result = x - Math.floor(x);
    return result;
  }
  let numPoints = (random() * 97) + 20;
  let points = [];
  for(let i = 0; i < numPoints; ++i)
    points.push( [ random() * 10.0, random() * 10.0 ] );
  return points;
}

function main(){
  var hullPoints = [];
  let points = [];
  for(let i = 0; i < 10000; ++i){
    points = randPoints();
    hullPoints = [];
    convexHull(points).forEach( point => {
      hullPoints.push(points[point]);
    });
    if(hullPoints.length > 2){
      console.log(GetAllAntiPodalPairs(hullPoints));
    }
  }
}
main();

