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
    const vec2 k = vec2( 0.3183099, 0.3678794 );
    x = x*k + k.yx;
    return -1.0 + 2.0*sin( (iTime*.04)*130.0 * k*fract( x.x*x.y*(x.x+x.y)) );
}

float noise( in vec2 p )
{
    vec2 i = floor( p );
    vec2 f = fract( p );

	vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{

    vec2 uv = fragCoord/iResolution.xy;
    vec2 r = vec2( fragCoord.xy - 0.05*iResolution.xy );
	float n= noise(1.5*uv);
    float n2= noise(.5*uv)*cos(n*iTime*.003)*20.;
	r = 1.0 * r.xy / iResolution.xy;


    vec3 col1 = vec3 (.97647,0.78431,0.71373);
    vec3 col2 = vec3 (0.06275,  0.14902 , 0.95686);
    vec3 col3 = vec3 (.97647,0.78431,0.71373);

     vec3 pixi;
    float width = cos(sin(.3 * u_time)*0.5)*n;
    float width2 = sin(cos(.03 * u_time)*n);
    float mody = mod(width+width2-n2,cos(sin(r.y+u_time*.04)*4.));

    if(cos(cos(.5* u_time)*n2) < mody){
        pixi = col3;
    	}
    else {
        pixi =col2;
        }
    if(sin(r.x+u_time)-n2 < mody){
        pixi = col3;

  	}

 gl_FragColor = vec4(pixi,1.0);



}
