
// function getRandomFontSize() {
// 	const rand = (Math.random() * (1.3 - 0.7) + 0.7).toFixed(1);
// 	console.log(rand);
// 	return `${rand}em`;
// }

let isRunning = false;

const wait = async ms => new Promise(resolve => setTimeout(resolve, ms));

async function showSkills() {
	if (window.location.hash === "#work" && !isRunning) {
		const typewriter = document.getElementById("typewriter")
		document.querySelectorAll("div#typewriter span.wrd").forEach(e => e.remove());
		if (typewriter) {
			isRunning = true;
			for (const s of strings) {
				const span = document.createElement("span");
				span.classList.add("wrd");
				// span.style.fontSize = getRandomFontSize();
				typewriter.appendChild(span);
				for (const c of Array.from(s)) {
					await wait(50);
					span.textContent += c;
				}
				span.classList.add("border");
				await wait(250);
			}
			isRunning = false;
		}
	}
}


const strings = [ ".NET", "Angular", "Apache", "Bash", "Bootstrap", "C#", "CSS3", "Docker", "Electron",
"Entity Framework", "Express", "Git", "Gitlab", "GraphQL", "HTML5", "Hyper-V", "IntelliJ Idea", "Java",
"Javascript", "Jenkins", "Jest", "JQuery", "JSON", "Kanban", "LDAP", "LINQ", "Linux", "LVM", "MariaDB", "MongoDB",
"MSSQL", "MySQL", "NestJS", "Nginx", "NoSQL", "Office", "PGP", "PHP", "Powershell", "Prisma", "Python", "RegEx",
"RestAPI", "SCRUM", "SCSS", "SQLite", "TFS", "TypeORM", "Typescript", "Unity", "Unit Testing", "Virtual Box",
"Visual Studio", "Visual Studio Code", "vSphere", "Windows", "XML"];

($ => {
	const $window = $(window);
	const $body = $("body");
	const $nav = $("#nav");
	const $nav_links = $nav.children("a");
	const $main = $("#main");
	const $panels = $main.children(".panel");

	// Play initial animations on page load.
	$window.on("load", () => {
		window.setTimeout(() => {
			$("#year").html(new Date().getFullYear());
			$body.removeClass("preload");
		}, 500);
	});


	// Initialize.
	(() => {
		let $panel;
		let $link;
		// Get panel, link.
		if (window.location.hash) {
			$panel = $panels.filter(window.location.hash);
			$link = $nav_links.filter(`[href="${window.location.hash}"]`);
		}
		// No panel/link? Default to first.
		if (!$panel || $panel.length === 0) {
			$panel = $panels.first();
			$link = $nav_links.first();
		}
		// Deactivate all panels except this one.
		$panels.not($panel).addClass("inactive").hide();
		// Activate link.
		$link.addClass("active");
		// Reset scroll.
		$window.scrollTop(0);
		showSkills();
	})();


	// Hashchange event.
	$window.on("hashchange", () => {

		let $panel;
		let $link;

		// Get panel, link.
		if (window.location.hash) {
			$panel = $panels.filter(window.location.hash);
			$link = $nav_links.filter(`[href="${window.location.hash}"]`);
			// No target panel? Bail.
			if ($panel.length === 0) {
				return;
			}
		} else {
			// No panel/link? Default to first.
			$panel = $panels.first();
			$link = $nav_links.first();
		}

		// Deactivate all panels.
		$panels.addClass("inactive");

		// Deactivate all links.
		$nav_links.removeClass("active");

		// Activate target link.
		$link.addClass("active");

		// Set max/min height.
		$main.css("max-height", `${$main.height()}px`).css("min-height", `${$main.height()}px`);

		// Delay.
		setTimeout(async () => {
			// Hide all panels.
			$panels.hide();
			// Show target panel.
			$panel.show();
			// Set new max/min height.
			$main.css("max-height", `${$panel.outerHeight()}px`).css("min-height", `${$panel.outerHeight()}px`);
			// Reset scroll.
			$window.scrollTop(0);
			// Delay.
			window.setTimeout(() => {
				$panel.removeClass("inactive");
				// Clear max/min height.
				$main.css("max-height", "").css("min-height", "");
				showSkills();
			}, 500);
		}, 250);

	});

})(jQuery);
