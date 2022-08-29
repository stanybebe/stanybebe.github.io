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
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    vec2 r = vec2( gl_FragCoord.xy - 0.5*u_resolution.xy );
  vec4 ctex =texture2D(tex,gl_FragCoord.xy);
    float n= (noise(.001*r.xy));

 

    float n2= (noise(.0005*r.xy)*cos(n*u_time*0.03)*1.);
	  r =  r.xy / u_resolution.xy;

    float p = smoothstep(ping,.0,1.5);
  float p2 = smoothstep(ping2,.0,1.5);
    vec3 col1 = vec3 (.97647,0.8431,0.1373);
    vec3 col2 = vec3 (0.9,  0.2 , .3);
    vec3 col3 = vec3 (.3,0.31,0.973);
     vec3 pixi;
  float rr= (random(5.*r.xy*p));
    float width = sin(.003 * u_time*ping)*n2;
    float width2 = cos(.003 * u_time*ping2)*n2*ctex.x;
    float mody = dot(width-width2-n2,sin(sin(length(r.y*p2*ctex.y)+u_time*.004))*rr);

    if(cos(sin(.5* u_time)/n2*ctex.y) < mody*rr){
        pixi = col3;
    	}
    else {
        pixi =col2;
        }
    if(sin(r.y+u_time)*n< mody*rr*ctex.x){
        pixi = col3;

  	}

 gl_FragColor = vec4(pixi,1.)/ctex;



}
