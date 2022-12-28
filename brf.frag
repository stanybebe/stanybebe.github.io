// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float ping;
uniform float ping2;
uniform sampler2D tex;
float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}
vec2 hash( vec2 x )
{
    const vec2 k = vec2( 0.5583199, 0.36787994 );
    x = x*k + k.yx;
    return -1.0 + 2.0*sin(cos(u_time*.4)*10.0 * k*fract( x.x*x.y*(x.x+x.y)) );
}

float noise( in vec2 p )
{
    vec2 i = floor( p );
    vec2 f = fract( p );

	vec2 u = f*f*(3.0-2.0*f);

    return sin(mix( mix( dot( hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y));
}
void main() {
   vec2 uv =  u_resolution;
    uv = 1.0 - uv;

      float n= (noise(.001*uv));
  vec3 ctex =texture2D(tex,uv).xyz;


 


 gl_FragColor = vec4(ctex,.1);



}
