#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

uniform float fraction;
uniform sampler2D tex;
varying vec2 vTexCoord;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 texelSize;


float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123+sin(u_time*.3));
}

vec2 hash2( vec2 x )
{
    const vec2 k = vec2( 0.3183099, 0.3678794 );
    x = x*k + k.yx;
    return -1.0 + 2.0*(sin(u_time*.3)*5.+ 16.0 * k*fract( x.x*x.y*(x.x+x.y)) );
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


float noisee (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}
#define OCTS 13
float fbm (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.;

    for (int i = 0; i < OCTS; i++) {
        value += amplitude * noisee(st)* noisee(st);
        st *= 1.9;
        amplitude *= .5;
    }
    return value;
}


void main() {
  float intensity;

      vec2 uv = vTexCoord;
        uv.y = 1.0 - uv.y;
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    vec2 r = vec2( gl_FragCoord.xy - 0.5*u_resolution.xy );
  float spread = sin(.02+u_time)*30.0;

  vec2 offset = texelSize * spread;
    vec3 col1 = vec3 (0.,0.,.0);
    vec3 col2 = vec3  (1.,1.,1.);
    vec3 col3 = vec3(.14,.04,.19);
    vec3 pixi;
     float f = noise(uv*.01);
       float ff = noisee(uv*.01);
  
  
     float n2 = noise(.004*r.xy);
     float speed = .03;
     float sine = sin(r.y*speed+u_time)*.01;
  vec4 texi = texture2D(tex, (uv+sine)+n2/400.); // middle middle -- the actual texel / pixel
  texi += texture2D(tex,(uv+sine)+n2/400.  + vec2(-offset.x, -offset.y)); // top left
  texi += texture2D(tex, (uv+sine)+n2/400. + vec2(0.0, -offset.y)); // top middle
  texi += texture2D(tex, (uv+sine)+n2/400. + vec2(offset.x, -offset.y)); // top right

  texi += texture2D(tex, (uv+sine)+n2/400. + vec2(-offset.x, 0.0)); //middle left
  texi += texture2D(tex, (uv+sine)+n2/400. + vec2(offset.x, 0.0)); //middle right

  texi += texture2D(tex, (uv+sine)+n2/400. + vec2(-offset.x, offset.y)); // bottom left
  texi += texture2D(tex, (uv+sine)+n2/400. + vec2(0.0, offset.y)); // bottom middle
  texi += texture2D(tex, (uv+sine)+n2/400. + vec2(offset.x, offset.y)); // bottom right
  
  texi /= 8.0;
    vec4 ctex =texture2D(tex,(uv+sine)+n2/400.);
    float n = fbm(.0004*r.xy);
   
   float noiseh = n;  
   vec4 warp = vec4(sin(ctex.x*u_time),ctex.y,ctex.z,1.);
        
        if(ctex.x>mod(uv.x,n)){

         pixi = col1;

      }

      else{pixi = col2;}

  
   
    
   gl_FragColor = vec4(ctex+(texi/2.));
}