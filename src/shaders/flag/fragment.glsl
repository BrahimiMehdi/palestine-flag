varying vec2 vUv;
varying vec3 pos;

void main()
{
    float pZ = pos.z/3.0;
    float pY = pos.y/3.0;
    float space = pY*pZ*0.5;
    float diagonalLimit = 0.6;
    float whiteZoneLimit = 0.035;
    float horizontalLimit = -whiteZoneLimit *0.5;
    float greenZoneLimit = -0.03;
    float upperRedZone = 0.01;
    float lowerRedZone = 0.009;
   if(pZ<0.01 && pY<horizontalLimit &&  pZ/pY  < diagonalLimit){
    gl_FragColor = vec4(1.0,0.0,0.0, 1.0);
   }
   else if(-pZ<lowerRedZone && pY<horizontalLimit  &&  pZ/pY  > -diagonalLimit) {
    gl_FragColor = vec4(1.0,0.0,0.0, 1.0);
   }

   else{
    if(pZ< greenZoneLimit){
    gl_FragColor = vec4(0.0,1.0,0.0, 1.0);

   }
   else if(pZ<whiteZoneLimit){
    gl_FragColor = vec4(1.0,1.0,1.0, 1.0);

   }
   else{
    gl_FragColor = vec4(0.0,0.0,0.0, 1.0);
        
   }
   }
  
}