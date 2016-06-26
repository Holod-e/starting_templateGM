# Starting_templateGM
Starting templateGM is a front-end HTML5 template for Genius Marketing developers.

##Gulp - Start Guide
<p>Need to ensure you have everything on your machine (Node.js, npm)</p>
<p>In root of template, use commands:</p>
<ul>
	<li>npm i</li>
	<li>gulp (Run project)</li>
	<li>gulp build (Build project)</li>
	<li>gulp sprite (make spite from all png files in app/img/sprite)</li>
</ul>
<p>You can use all tasks when you want. Only write command $ gulp + taskname in console.</p>
<p>Example: $ gulp compress = compress all img in app/img</p>
<p>Example: $ gulp pnquant = compress all png in app/img</p>
##SASS Partials
<p>The partials directory is where most of the CSS is constructed. Plan ahead and think how to structure these.</p>
<ul>
	<li>_header.scss - Styles for header</li>
	<li>_footer.scss - ready styles for Geniusm Marketing standart footer</li>
	<li>_buttons.scss - Button styles</li>
	<li>_variables.scss - Colours, Typography</li>
	<li>_media.scss - Media queries</li>
</ul>

##Structuring your projects
<p>This is a developer preference. There is no official way. Do you want all your pages in partials? Would you rather just add main components and still use style.scss for the bulk of the CSS? Do what's best for you and your project.</p>

##About bootstrapGM.css
<p>bootstrapGM.css is a normalize.css and castomized grid system for project. Properties of this grid system:</p>
<ul>
	<li>Breakpoints: 960px, 720px</li>
	<li>Use col-xs for mobile grid (320px - 720px)</li>
	<li>Use col-sm for tablet grid (720px - 960px)</li>
	<li>Use col-md for notebook grid (960px - 1130px )</li>
	<li>Use col-lg for desktop grid ( > 1130px )</li>
	<li>container sizes :
		<ul>
			<li>.container {width: 320px} for mobile grid</li>
			<li>.container {width: 720px} for tablet grid</li>
			<li>.container {width: 960px} for notebook grid</li>
			<li>.container {width: 1130px} for desktop grid</li>
		</ul>
	</li>
</ul>




