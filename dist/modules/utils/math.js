//      strict
                                          

export function calculateDistance({ pointStart, pointEnd, } 
                                         )         {
  const distanceX = Math.abs(pointStart[0] - pointEnd[0]);
  const distanceY = Math.abs(pointStart[1] - pointEnd[1]);
  return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
}
