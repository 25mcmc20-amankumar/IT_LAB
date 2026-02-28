(function ($) {

    $.fn.tabPlugin = function (options) {

        var settings = $.extend({
            activeClass: "active",
            animationSpeed: 300,
            defaultTab: 0
        }, options);

        return this.each(function () {

            var container = $(this);
            var tabs = container.find(".tab-links li");
            var links = container.find(".tab-links a");
            var panels = container.find(".tab-panel");

            function activateTab(index) {
                tabs.removeClass(settings.activeClass);
                panels.hide();

                $(tabs[index]).addClass(settings.activeClass);
                $(panels[index]).fadeIn(settings.animationSpeed);

                var hash = $(links[index]).attr("href");
                window.location.hash = hash;
            }

            activateTab(settings.defaultTab);

            links.click(function (e) {
                e.preventDefault();
                var index = links.index(this);
                activateTab(index);
            });

            if (window.location.hash) {
                var hashIndex = links.index(
                    links.filter('[href="' + window.location.hash + '"]')
                );
                if (hashIndex !== -1) {
                    activateTab(hashIndex);
                }
            }

            container.attr("tabindex", "0");

            container.keydown(function (e) {
                var currentIndex = tabs.index(
                    container.find("." + settings.activeClass)
                );

                if (e.key === "ArrowRight") {
                    var next = (currentIndex + 1) % tabs.length;
                    activateTab(next);
                }

                if (e.key === "ArrowLeft") {
                    var prev = (currentIndex - 1 + tabs.length) % tabs.length;
                    activateTab(prev);
                }
            });

        });
    };

}(jQuery));