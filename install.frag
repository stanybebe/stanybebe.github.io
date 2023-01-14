#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

uniform float fraction;
uniform sampler2D tex;
varying vec2 vTexCoord;
uniform float u_time;
uniform vec2 u_resolution;




vec2 hash2( vec2 x )
{
    const vec2 k = vec2( 0.3183099, 0.3678794 );
    x = x*k + k.yx;
    return -1.0 + 2.0*fract(sin(u_time*.3)+ 16.0 * k*fract( x.x*x.y*(x.x+x.y)) );
}

float noise( in vec2 p )
{
    vec2 i = floor( p );
    vec2 f = fract( p );

	vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( hash2( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( hash2( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( hash2( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( hash2( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}


void main() {
  float intensity;

      vec2 uv = vTexCoord;
        uv.y = 1.0 - uv.y;
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    vec2 r = vec2( gl_FragCoord.xy - 0.5*u_resolution.xy );
 
    vec3 col1 = vec3 (0.95,0.35,.15);
    vec3 col2 = vec3  (0.0,1.,.39);
    vec3 col3 = vec3(.14,.04,.19);
    vec3 pixi;
     float f = noise(uv*.01);
     float n2 = noise(.4*r.xy);
    vec4 ctex =texture2D(tex,(uv));
    float n = noise(.004*r.xy)-f;
   
   float noiseh = n;  
   vec4 warp = vec4(sin(ctex.x*u_time),ctex.y,ctex.z,1.);
        
        if(ctex.x>mod(uv.x,noiseh)){

         pixi = col1;

      }

      else{pixi = col2;}

     vec3 t = vec3(ctex.x*col3.x,ctex.y*col3.y,ctex.z*col3.z);
    
   gl_FragColor = vec4(pixi+(t*5.2),1.);
}