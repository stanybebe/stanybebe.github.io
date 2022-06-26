// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 hash( vec2 x )
{
    const vec2 k = vec2( 0.5183099, 0.3678794 );
    x = x*k + k.yx;
    return -2.0 + 2.0*(cos(u_time*.04)*10.0 * k*fract( x.x*x.y*(x.x+x.y)) );
}

float noise( in vec2 p )
{
    vec2 i = floor( p );
    vec2 f = fract( p );

	vec2 u = f*f*(4.0-4.0*ceil(f));

    return sin(floor(mix( mix( dot( hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y)));
}
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    vec2 r = vec2( gl_FragCoord.xy - 0.5*u_resolution.xy );
    
    float n= noise(.005*r.xy);


    float n2= noise(.0005*r.xy)*cos(n*u_time*0.03)*.005;
	  r =  r.xy / u_resolution.xy;

    float sn = smoothstep(n,n2,.5);
    vec3 col2 = vec3 (0.4, .82, 0.48);
 
    vec3 col3 = vec3 (.12,0.24,0.29);
     vec3 pixi;
    float width = (sin(.03 * u_time)*0.5)*sn;
    float width2 = (sin(cos(.03 * u_time)*sn));
    float mody = mod(width-width2*(sn),(sin(r.x+u_time*.004)*8.));

    if((cos(sin(.05* u_time)+sn)) < mody){
        pixi = col3;
    	}
    else {
        pixi =col2;
        }
    if(sin(r.x+u_time)*sn < mody){
        pixi = col3;

  	}
vec3 smooth = smoothstep(col2, col3, (vec3 (r.x-sn,r.x-sn,r.x-sn)*pixi));
 gl_FragColor = vec4(smooth*pixi,1.0);



}
