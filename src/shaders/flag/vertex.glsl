varying vec2 vUv;
varying vec3 pos;
uniform vec2 uFrequency;
uniform float uWavesSpeed;
uniform float uElevation;
uniform float uTime;
void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float elevation = sin(modelPosition.x*uFrequency.x +uTime*uWavesSpeed) * uElevation;
    modelPosition.y += elevation;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
    vUv = uv;
    pos=position;
}