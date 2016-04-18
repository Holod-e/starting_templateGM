# Starting_templateGM
Starting templateGM is a front-end HTML5 template for Genius Marketing developers.

##Gulp - Start Guide
<p>Need to ensure you have everything on your machine (Node.js, npm, bower)</p>
<p>In root of template, use commands:</p>
<ul>
	<li>npm i</li>
	<li>bower i</li>
	<li>gulp (Run project)</li>
	<li>gulp build (Build project)</li>
	<li>gulp sprite (make spite from all png files in app/img/sprite)</li>
</ul>

##SASS Partials
<p>The partials directory is where most of the CSS is constructed. Plan ahead and think how to structure these.</p>
<ul>
	<li>_header.scss - Styles for header</li>
	<li>_footer.scss - ready styles for Geniusm Marketing standart footer</li>
	<li>_buttons.scss - Button styles</li>
	<li>_variables.scss - Colours, Typography</li>
	<li>_media.scss - Media queries</li>
	<li>_validator - styles for validatorGM.js</li>
</ul>

##Structuring your projects
<p>This is a developer preference. There is no official way. Do you want all your pages in partials? Would you rather just add main components and still use style.scss for the bulk of the CSS? Do what's best for you and your project.</p>

##About bootstrapGM.css
<p>bootstrapGM.css is a normalize.css and castomized grid system for prject. Properties of this grid system:</p>
<ul>
	<li>Breakpoints: 960px, 720px</li>
	<li>Use col-xs for mobile grid (320px - 720px)</li>
	<li>Use col-sm for tablet grid (720px - 960px)</li>
	<li>Use col-md for desktop grid ( > 960px )</li>
	<li>container sizes :
		<ul>
			<li>.contaier {width: 320px} for mobile grid</li>
			<li>.contaier {width: 720px} for tablet grid</li>
			<li>.contaier {width: 960px} for desktop grid</li>
		</ul>
	</li>
</ul>


