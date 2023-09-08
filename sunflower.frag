#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

uniform float fraction;
uniform float colA;
uniform float colB;
uniform float colC;
uniform sampler2D texture;
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying highp vec2 vertTexCoord;

void main() {
  float intensity;
  vec4 color;
    vec4 ctex =texture2D(texture, vertTexCoord.xy);
  intensity = max(0.0, dot(vertLightDir, vertNormal));
//this is the colors for the toon shader
  if (intensity > pow(0.85, fraction)) {
    color = vec4(colA,colB,colC, 1.0);
  }
   else {
    color = vec4(colA-.3,colB-.3,colC-.3, 1.0);
  }

  gl_FragColor = (color * vertColor)-(ctex*-.50);
}