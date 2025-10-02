Name of the X3D tool: X3D: 360 photo and video spheres w WebXR (MIT License)

Type of Tool: Viewer ; Domain Categories: Educational tools, Template

What problem does this tool solve? Creates a photo or videosphere in X3D and shows an example viewer in X3DOM and WebXR


Abstract:
This X3D scene makes it easy to create a photo or videosphere in X3D and shows a viewer in X3DOM and WebXR. The scene is built with some specific properties that make it easy to put your own images and videos into the 3D Web. The scene contains the geometry of a large tessellated sphere (radius 18 meters; 64 divisions for Lat and Long) that is smoothly shaded and only visible from the inside. Using <TextureTransform scale=’-1 1’/>, the texture is flipped and rendered on the inside of the sphere. The radius was chosen to approximate the focal length of the 360 degree capture camera. We have tested with images and videos of up to 4096 resolution. We provide the basic X3D files as well as an HTML UI using X3DOM. In the HTML version, users can add their own image or video urls as well as add HTML labels for multiple equirectangular collections. The expanded example adds a ‘play/pause’ button and a ‘fullscreen’ button. For spherical image viewing, we use a custom NavigationInfo type we call ‘Reverse_Turntable’ (see below).


To customize the tool for your photos and videos, open the HTML source and edit the list of files at the top Javascript (around line 17). You can also customize your selection panel title and media labels around lines 84.

Links:
http://metagrid1.sv.vt.edu/~npolys/Web3D/Tools_2025/X3D_Spheres/
https://metagrid1.sv.vt.edu/~npolys/Web3D/Tools_2025/X3D_Spheres/Photosphere_example.html
https://metagrid1.sv.vt.edu/~npolys/Web3D/Tools_2025/X3D_Spheres/Videosphere_example.html
https://metagrid1.sv.vt.edu/~npolys/Web3D/Tools_2025/X3D_Spheres/Videosphere_example_expanded.html

Credits:

Photosphere images courtesy VT Prof. John Munsell and USDA NASP Program: Forest Management.
360 videos courtesy of VT Prof. Ha and and Polys and ICAT SEED Program: 3D Roanoke and flood visualization rendered in blender.
As described in:

Polys, Nicholas F., et al. "Extensible experiences: fusality for stream and field." Proceedings of the 21st International Conference on Web3D Technology. 2016.

Polys, Nicholas F., et al. "X3d field trips for remote learning." Proceedings of the 26th International Conference on 3D Web Technology. 2021.

-------------------------------

	Through user studies of our photo and videosphere viewer, we discovered that many non-3D professionals do not use the metaphor of camera control when using a mouse. Instead, they imagine grabbing and dragging the environment (sphere) with their ‘hand’. We have called this camera control technique ‘Reverse TURNTABLE’ because it is based on the experimental navigation type ‘TURNTABLE’, which provides an heading and azimuth, but no roll; we then negated the mapping of x and y mouse position to create a usable navigation for the audience using their metaphor.


X3DOM 1.8.3 : in src/nodes/Navigation/modes/TurntableNavigation.js :

Replace

< alpha = ( dy * 2 * Math.PI ) / view._height;
< beta = ( dx * 2 * Math.PI ) / view._width;

with

> alpha = ( dy * 2 * Math.PI ) / view._height * navi._vf.speed * -1.0;
> beta = ( dx * 2 * Math.PI ) / view._width * navi._vf.speed * -1.0;


And then rebuild X3DOM!


Live mod is here:
http://metagrid1.sv.vt.edu/~npolys/Web3D/Tools_2025/X3D_Spheres/x3dom/

MIT Licensed.
