// Author:
// Title:
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D tex;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123+sin(u_time*.3));
}

vec2 hash( vec2 x )
{
    const vec2 k = vec2( 0.5583199, 0.36787994 );
    x = x*k + k.yx;
    return -1.0 + 2.0*fract(cos(u_time*.4)*50.0 * k * fract( x.x*x.y*(x.x+x.y)) );
}

float noise (in vec2 st) {
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
        value += amplitude * noise(st);
        st *= 50.;
        amplitude *= .5;
    }
    return value;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 r = vec2( gl_FragCoord.xy - 0.5*u_resolution.xy );
    vec4 ctex = texture2D(tex,gl_FragCoord.xy);
    float n= (fbm(.005*r.xy));
    float n2= length(fbm(.005*r.xy)*cos(n*u_time*0.003)*10.)*n;
    r = r.xy / u_resolution.xy;
    
    vec3 col1 = vec3(0.0, 0.0, 0.0); // Black
    vec3 col2 = vec3(0.196, 0.588, 0.8); // Curious Blue #3296CC
    vec3 col3 = vec3(0.867, 0.949, 0.247); // Starship #DDF23F
    vec3 pixi;
    float rr= (random(60.1*r.xy*n));
    float width = fract(sin(.3 * u_time)*n2);
    float width2 = cos(.3 * u_time)*n2*ctex.x;
    float mody = mod(width-width2-n2,fract(cos(length(rr*ctex.y)+u_time*.04))*rr);
    if(sin(cos(.5* u_time)*n2*ctex.y) < length(mody*n2*rr)){
        pixi = col3;
     }
    else {
        pixi =col2;
        }
    if(sin(r.y+u_time)*rr< fract(mody*rr*ctex.x)){
        pixi = col3;
   }
gl_FragColor = vec4(pixi,1.)/(ctex/n2);
}