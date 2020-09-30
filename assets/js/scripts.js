// Utility function
function Util () {};

/* 
	class manipulation functions
*/
Util.hasClass = function(el, className) {
	if (el.classList) return el.classList.contains(className);
	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

Util.addClass = function(el, className) {
	var classList = className.split(' ');
 	if (el.classList) el.classList.add(classList[0]);
 	else if (!Util.hasClass(el, classList[0])) el.className += " " + classList[0];
 	if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.removeClass = function(el, className) {
	var classList = className.split(' ');
	if (el.classList) el.classList.remove(classList[0]);	
	else if(Util.hasClass(el, classList[0])) {
		var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
		el.className=el.className.replace(reg, ' ');
	}
	if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
};

Util.toggleClass = function(el, className, bool) {
	if(bool) Util.addClass(el, className);
	else Util.removeClass(el, className);
};

Util.setAttributes = function(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};

/* 
  DOM manipulation
*/
Util.getChildrenByClassName = function(el, className) {
  var children = el.children,
    childrenByClass = [];
  for (var i = 0; i < el.children.length; i++) {
    if (Util.hasClass(el.children[i], className)) childrenByClass.push(el.children[i]);
  }
  return childrenByClass;
};

Util.is = function(elem, selector) {
  if(selector.nodeType){
    return elem === selector;
  }

  var qa = (typeof(selector) === 'string' ? document.querySelectorAll(selector) : selector),
    length = qa.length,
    returnArr = [];

  while(length--){
    if(qa[length] === elem){
      return true;
    }
  }

  return false;
};

/* 
	Animate height of an element
*/
Util.setHeight = function(start, to, element, duration, cb) {
	var change = to - start,
	    currentTime = null;

  var animateHeight = function(timestamp){  
    if (!currentTime) currentTime = timestamp;         
    var progress = timestamp - currentTime;
    var val = parseInt((progress/duration)*change + start);
    element.style.height = val+"px";
    if(progress < duration) {
        window.requestAnimationFrame(animateHeight);
    } else {
    	cb();
    }
  };
  
  //set the height of the element before starting animation -> fix bug on Safari
  element.style.height = start+"px";
  window.requestAnimationFrame(animateHeight);
};

/* 
	Smooth Scroll
*/

Util.scrollTo = function(final, duration, cb, scrollEl) {
  var element = scrollEl || window;
  var start = element.scrollTop || document.documentElement.scrollTop,
    currentTime = null;

  if(!scrollEl) start = window.scrollY || document.documentElement.scrollTop;
      
  var animateScroll = function(timestamp){
  	if (!currentTime) currentTime = timestamp;        
    var progress = timestamp - currentTime;
    if(progress > duration) progress = duration;
    var val = Math.easeInOutQuad(progress, start, final-start, duration);
    element.scrollTo(0, val);
    if(progress < duration) {
        window.requestAnimationFrame(animateScroll);
    } else {
      cb && cb();
    }
  };

  window.requestAnimationFrame(animateScroll);
};

/* 
  Focus utility classes
*/

//Move focus to an element
Util.moveFocus = function (element) {
  if( !element ) element = document.getElementsByTagName("body")[0];
  element.focus();
  if (document.activeElement !== element) {
    element.setAttribute('tabindex','-1');
    element.focus();
  }
};

/* 
  Misc
*/

Util.getIndexInArray = function(array, el) {
  return Array.prototype.indexOf.call(array, el);
};

Util.cssSupports = function(property, value) {
  if('CSS' in window) {
    return CSS.supports(property, value);
  } else {
    var jsProperty = property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase();});
    return jsProperty in document.body.style;
  }
};

// merge a set of user options into plugin defaults
// https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
Util.extend = function() {
  // Variables
  var extended = {};
  var deep = false;
  var i = 0;
  var length = arguments.length;

  // Check if a deep merge
  if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
    deep = arguments[0];
    i++;
  }

  // Merge the object into the extended object
  var merge = function (obj) {
    for ( var prop in obj ) {
      if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
        // If deep merge and property is an object, merge properties
        if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
          extended[prop] = extend( true, extended[prop], obj[prop] );
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  };

  // Loop through each object and conduct a merge
  for ( ; i < length; i++ ) {
    var obj = arguments[i];
    merge(obj);
  }

  return extended;
};

// Check if Reduced Motion is enabled
Util.osHasReducedMotion = function() {
  if(!window.matchMedia) return false;
  var matchMediaObj = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(matchMediaObj) return matchMediaObj.matches;
  return false; // return false if not supported
}; 

/* 
	Polyfills
*/
//Closest() method
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
	Element.prototype.closest = function(s) {
		var el = this;
		if (!document.documentElement.contains(el)) return null;
		do {
			if (el.matches(s)) return el;
			el = el.parentElement || el.parentNode;
		} while (el !== null && el.nodeType === 1); 
		return null;
	};
}

//Custom Event() constructor
if ( typeof window.CustomEvent !== "function" ) {

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
}

/* 
	Animation curves
*/
Math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

Math.easeInQuart = function (t, b, c, d) {
	t /= d;
	return c*t*t*t*t + b;
};

Math.easeOutQuart = function (t, b, c, d) { 
  t /= d;
	t--;
	return -c * (t*t*t*t - 1) + b;
};

Math.easeInOutQuart = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t*t + b;
	t -= 2;
	return -c/2 * (t*t*t*t - 2) + b;
};

Math.easeOutElastic = function (t, b, c, d) {
  var s=1.70158;var p=d*0.7;var a=c;
  if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
  if (a < Math.abs(c)) { a=c; var s=p/4; }
  else var s = p/(2*Math.PI) * Math.asin (c/a);
  return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
};


/* JS Utility Classes */
(function() {
  // make focus ring visible only for keyboard navigation (i.e., tab key) 
  var focusTab = document.getElementsByClassName('js-tab-focus');
  function detectClick() {
    if(focusTab.length > 0) {
      resetFocusTabs(false);
      window.addEventListener('keydown', detectTab);
    }
    window.removeEventListener('mousedown', detectClick);
  };

  function detectTab(event) {
    if(event.keyCode !== 9) return;
    resetFocusTabs(true);
    window.removeEventListener('keydown', detectTab);
    window.addEventListener('mousedown', detectClick);
  };

  function resetFocusTabs(bool) {
    var outlineStyle = bool ? '' : 'none';
    for(var i = 0; i < focusTab.length; i++) {
      focusTab[i].style.setProperty('outline', outlineStyle);
    }
  };
  window.addEventListener('mousedown', detectClick);
}());
// File#: _1_anim-menu-btn
// Usage: codyhouse.co/license
(function() {
    var menuBtns = document.getElementsByClassName('js-anim-menu-btn');
    if( menuBtns.length > 0 ) {
        for(var i = 0; i < menuBtns.length; i++) {(function(i){
            initMenuBtn(menuBtns[i]);
        })(i);}

        function initMenuBtn(btn) {
            btn.addEventListener('click', function(event){
                event.preventDefault();
                var status = !Util.hasClass(btn, 'anim-menu-btn--state-b');
                Util.toggleClass(btn, 'anim-menu-btn--state-b', status);
                // emit custom event
                var event = new CustomEvent('anim-menu-btn-clicked', {detail: status});
                btn.dispatchEvent(event);
            });
        };
    }
}());
// File#: _1_diagonal-movement
// Usage: codyhouse.co/license
/*
  Modified version of the jQuery-menu-aim plugin
  https://github.com/kamens/jQuery-menu-aim
  - Replaced jQuery with Vanilla JS
  - Minor changes
*/
(function() {
    var menuAim = function(opts) {
        init(opts);
    };

    window.menuAim = menuAim;

    function init(opts) {
        var activeRow = null,
            mouseLocs = [],
            lastDelayLoc = null,
            timeoutId = null,
            options = Util.extend({
                menu: '',
                rows: false, //if false, get direct children - otherwise pass nodes list
                submenuSelector: "*",
                submenuDirection: "right",
                tolerance: 75,  // bigger = more forgivey when entering submenu
                enter: function(){},
                exit: function(){},
                activate: function(){},
                deactivate: function(){},
                exitMenu: function(){}
            }, opts),
            menu = options.menu;

        var MOUSE_LOCS_TRACKED = 3,  // number of past mouse locations to track
            DELAY = 300;  // ms delay when user appears to be entering submenu

        /**
         * Keep track of the last few locations of the mouse.
         */
        var mousemoveDocument = function(e) {
            mouseLocs.push({x: e.pageX, y: e.pageY});

            if (mouseLocs.length > MOUSE_LOCS_TRACKED) {
                mouseLocs.shift();
            }
        };

        /**
         * Cancel possible row activations when leaving the menu entirely
         */
        var mouseleaveMenu = function() {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            // If exitMenu is supplied and returns true, deactivate the
            // currently active row on menu exit.
            if (options.exitMenu(this)) {
                if (activeRow) {
                    options.deactivate(activeRow);
                }

                activeRow = null;
            }
        };

        /**
         * Trigger a possible row activation whenever entering a new row.
         */
        var mouseenterRow = function() {
                if (timeoutId) {
                    // Cancel any previous activation delays
                    clearTimeout(timeoutId);
                }

                options.enter(this);
                possiblyActivate(this);
            },
            mouseleaveRow = function() {
                options.exit(this);
            };

        /*
         * Immediately activate a row if the user clicks on it.
         */
        var clickRow = function() {
            activate(this);
        };

        /**
         * Activate a menu row.
         */
        var activate = function(row) {
            if (row == activeRow) {
                return;
            }

            if (activeRow) {
                options.deactivate(activeRow);
            }

            options.activate(row);
            activeRow = row;
        };

        /**
         * Possibly activate a menu row. If mouse movement indicates that we
         * shouldn't activate yet because user may be trying to enter
         * a submenu's content, then delay and check again later.
         */
        var possiblyActivate = function(row) {
            var delay = activationDelay();

            if (delay) {
                timeoutId = setTimeout(function() {
                    possiblyActivate(row);
                }, delay);
            } else {
                activate(row);
            }
        };

        /**
         * Return the amount of time that should be used as a delay before the
         * currently hovered row is activated.
         *
         * Returns 0 if the activation should happen immediately. Otherwise,
         * returns the number of milliseconds that should be delayed before
         * checking again to see if the row should be activated.
         */
        var activationDelay = function() {
            if (!activeRow || !Util.is(activeRow, options.submenuSelector)) {
                // If there is no other submenu row already active, then
                // go ahead and activate immediately.
                return 0;
            }

            function getOffset(element) {
                var rect = element.getBoundingClientRect();
                return { top: rect.top + window.pageYOffset, left: rect.left + window.pageXOffset };
            };

            var offset = getOffset(menu),
                upperLeft = {
                    x: offset.left,
                    y: offset.top - options.tolerance
                },
                upperRight = {
                    x: offset.left + menu.offsetWidth,
                    y: upperLeft.y
                },
                lowerLeft = {
                    x: offset.left,
                    y: offset.top + menu.offsetHeight + options.tolerance
                },
                lowerRight = {
                    x: offset.left + menu.offsetWidth,
                    y: lowerLeft.y
                },
                loc = mouseLocs[mouseLocs.length - 1],
                prevLoc = mouseLocs[0];

            if (!loc) {
                return 0;
            }

            if (!prevLoc) {
                prevLoc = loc;
            }

            if (prevLoc.x < offset.left || prevLoc.x > lowerRight.x || prevLoc.y < offset.top || prevLoc.y > lowerRight.y) {
                // If the previous mouse location was outside of the entire
                // menu's bounds, immediately activate.
                return 0;
            }

            if (lastDelayLoc && loc.x == lastDelayLoc.x && loc.y == lastDelayLoc.y) {
                // If the mouse hasn't moved since the last time we checked
                // for activation status, immediately activate.
                return 0;
            }

            // Detect if the user is moving towards the currently activated
            // submenu.
            //
            // If the mouse is heading relatively clearly towards
            // the submenu's content, we should wait and give the user more
            // time before activating a new row. If the mouse is heading
            // elsewhere, we can immediately activate a new row.
            //
            // We detect this by calculating the slope formed between the
            // current mouse location and the upper/lower right points of
            // the menu. We do the same for the previous mouse location.
            // If the current mouse location's slopes are
            // increasing/decreasing appropriately compared to the
            // previous's, we know the user is moving toward the submenu.
            //
            // Note that since the y-axis increases as the cursor moves
            // down the screen, we are looking for the slope between the
            // cursor and the upper right corner to decrease over time, not
            // increase (somewhat counterintuitively).
            function slope(a, b) {
                return (b.y - a.y) / (b.x - a.x);
            };

            var decreasingCorner = upperRight,
                increasingCorner = lowerRight;

            // Our expectations for decreasing or increasing slope values
            // depends on which direction the submenu opens relative to the
            // main menu. By default, if the menu opens on the right, we
            // expect the slope between the cursor and the upper right
            // corner to decrease over time, as explained above. If the
            // submenu opens in a different direction, we change our slope
            // expectations.
            if (options.submenuDirection == "left") {
                decreasingCorner = lowerLeft;
                increasingCorner = upperLeft;
            } else if (options.submenuDirection == "below") {
                decreasingCorner = lowerRight;
                increasingCorner = lowerLeft;
            } else if (options.submenuDirection == "above") {
                decreasingCorner = upperLeft;
                increasingCorner = upperRight;
            }

            var decreasingSlope = slope(loc, decreasingCorner),
                increasingSlope = slope(loc, increasingCorner),
                prevDecreasingSlope = slope(prevLoc, decreasingCorner),
                prevIncreasingSlope = slope(prevLoc, increasingCorner);

            if (decreasingSlope < prevDecreasingSlope && increasingSlope > prevIncreasingSlope) {
                // Mouse is moving from previous location towards the
                // currently activated submenu. Delay before activating a
                // new menu row, because user may be moving into submenu.
                lastDelayLoc = loc;
                return DELAY;
            }

            lastDelayLoc = null;
            return 0;
        };

        /**
         * Hook up initial menu events
         */
        menu.addEventListener('mouseleave', mouseleaveMenu);
        var rows = (options.rows) ? options.rows : menu.children;
        if(rows.length > 0) {
            for(var i = 0; i < rows.length; i++) {(function(i){
                rows[i].addEventListener('mouseenter', mouseenterRow);
                rows[i].addEventListener('mouseleave', mouseleaveRow);
                rows[i].addEventListener('click', clickRow);
            })(i);}
        }

        document.addEventListener('mousemove', function(event){
            (!window.requestAnimationFrame) ? mousemoveDocument(event) : window.requestAnimationFrame(function(){mousemoveDocument(event);});
        });
    };
}());


// File#: _1_modal-window
// Usage: codyhouse.co/license
(function() {
    var Modal = function(element) {
        this.element = element;
        this.triggers = document.querySelectorAll('[aria-controls="'+this.element.getAttribute('id')+'"]');
        this.firstFocusable = null;
        this.lastFocusable = null;
        this.moveFocusEl = null; // focus will be moved to this element when modal is open
        this.modalFocus = this.element.getAttribute('data-modal-first-focus') ? this.element.querySelector(this.element.getAttribute('data-modal-first-focus')) : null;
        this.selectedTrigger = null;
        this.showClass = "modal--is-visible";
        this.initModal();
    };

    Modal.prototype.initModal = function() {
        var self = this;
        //open modal when clicking on trigger buttons
        if ( this.triggers ) {
            for(var i = 0; i < this.triggers.length; i++) {
                this.triggers[i].addEventListener('click', function(event) {
                    event.preventDefault();
                    if(Util.hasClass(self.element, self.showClass)) {
                        self.closeModal();
                        return;
                    }
                    self.selectedTrigger = event.target;
                    self.showModal();
                    self.initModalEvents();
                });
            }
        }

        // listen to the openModal event -> open modal without a trigger button
        this.element.addEventListener('openModal', function(event){
            if(event.detail) self.selectedTrigger = event.detail;
            self.showModal();
            self.initModalEvents();
        });

        // listen to the closeModal event -> close modal without a trigger button
        this.element.addEventListener('closeModal', function(event){
            if(event.detail) self.selectedTrigger = event.detail;
            self.closeModal();
        });

        // if modal is open by default -> initialise modal events
        if(Util.hasClass(this.element, this.showClass)) this.initModalEvents();
    };

    Modal.prototype.showModal = function() {
        var self = this;
        Util.addClass(this.element, this.showClass);
        this.getFocusableElements();
        this.moveFocusEl.focus();
        // wait for the end of transitions before moving focus
        this.element.addEventListener("transitionend", function cb(event) {
            self.moveFocusEl.focus();
            self.element.removeEventListener("transitionend", cb);
        });
        this.emitModalEvents('modalIsOpen');
    };

    Modal.prototype.closeModal = function() {
        if(!Util.hasClass(this.element, this.showClass)) return;
        Util.removeClass(this.element, this.showClass);
        this.firstFocusable = null;
        this.lastFocusable = null;
        this.moveFocusEl = null;
        if(this.selectedTrigger) this.selectedTrigger.focus();
        //remove listeners
        this.cancelModalEvents();
        this.emitModalEvents('modalIsClose');
    };

    Modal.prototype.initModalEvents = function() {
        //add event listeners
        this.element.addEventListener('keydown', this);
        this.element.addEventListener('click', this);
    };

    Modal.prototype.cancelModalEvents = function() {
        //remove event listeners
        this.element.removeEventListener('keydown', this);
        this.element.removeEventListener('click', this);
    };

    Modal.prototype.handleEvent = function (event) {
        switch(event.type) {
            case 'click': {
                this.initClick(event);
            }
            case 'keydown': {
                this.initKeyDown(event);
            }
        }
    };

    Modal.prototype.initKeyDown = function(event) {
        if( event.keyCode && event.keyCode == 9 || event.key && event.key == 'Tab' ) {
            //trap focus inside modal
            this.trapFocus(event);
        } else if( (event.keyCode && event.keyCode == 13 || event.key && event.key == 'Enter') && event.target.closest('.js-modal__close')) {
            event.preventDefault();
            this.closeModal(); // close modal when pressing Enter on close button
        }
    };

    Modal.prototype.initClick = function(event) {
        //close modal when clicking on close button or modal bg layer
        if( !event.target.closest('.js-modal__close') && !Util.hasClass(event.target, 'js-modal') ) return;
        event.preventDefault();
        this.closeModal();
    };

    Modal.prototype.trapFocus = function(event) {
        if( this.firstFocusable == document.activeElement && event.shiftKey) {
            //on Shift+Tab -> focus last focusable element when focus moves out of modal
            event.preventDefault();
            this.lastFocusable.focus();
        }
        if( this.lastFocusable == document.activeElement && !event.shiftKey) {
            //on Tab -> focus first focusable element when focus moves out of modal
            event.preventDefault();
            this.firstFocusable.focus();
        }
    }

    Modal.prototype.getFocusableElements = function() {
        //get all focusable elements inside the modal
        var allFocusable = this.element.querySelectorAll(focusableElString);
        this.getFirstVisible(allFocusable);
        this.getLastVisible(allFocusable);
        this.getFirstFocusable();
    };

    Modal.prototype.getFirstVisible = function(elements) {
        //get first visible focusable element inside the modal
        for(var i = 0; i < elements.length; i++) {
            if( isVisible(elements[i]) ) {
                this.firstFocusable = elements[i];
                break;
            }
        }
    };

    Modal.prototype.getLastVisible = function(elements) {
        //get last visible focusable element inside the modal
        for(var i = elements.length - 1; i >= 0; i--) {
            if( isVisible(elements[i]) ) {
                this.lastFocusable = elements[i];
                break;
            }
        }
    };

    Modal.prototype.getFirstFocusable = function() {
        if(!this.modalFocus || !Element.prototype.matches) {
            this.moveFocusEl = this.firstFocusable;
            return;
        }
        var containerIsFocusable = this.modalFocus.matches(focusableElString);
        if(containerIsFocusable) {
            this.moveFocusEl = this.modalFocus;
        } else {
            this.moveFocusEl = false;
            var elements = this.modalFocus.querySelectorAll(focusableElString);
            for(var i = 0; i < elements.length; i++) {
                if( isVisible(elements[i]) ) {
                    this.moveFocusEl = elements[i];
                    break;
                }
            }
            if(!this.moveFocusEl) this.moveFocusEl = this.firstFocusable;
        }
    };

    Modal.prototype.emitModalEvents = function(eventName) {
        var event = new CustomEvent(eventName, {detail: this.selectedTrigger});
        this.element.dispatchEvent(event);
    };

    function isVisible(element) {
        return element.offsetWidth || element.offsetHeight || element.getClientRects().length;
    };

    //initialize the Modal objects
    var modals = document.getElementsByClassName('js-modal');
    // generic focusable elements string selector
    var focusableElString = '[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary';
    if( modals.length > 0 ) {
        var modalArrays = [];
        for( var i = 0; i < modals.length; i++) {
            (function(i){modalArrays.push(new Modal(modals[i]));})(i);
        }

        window.addEventListener('keydown', function(event){ //close modal window on esc
            if(event.keyCode && event.keyCode == 27 || event.key && event.key.toLowerCase() == 'escape') {
                for( var i = 0; i < modalArrays.length; i++) {
                    (function(i){modalArrays[i].closeModal();})(i);
                };
            }
        });
    }
}());
// File#: _1_sub-navigation
// Usage: codyhouse.co/license
(function () {
  var SideNav = function (element) {
    this.element = element;
    this.control = this.element.getElementsByClassName("js-subnav__control");
    this.navList = this.element.getElementsByClassName("js-subnav__wrapper");
    this.closeBtn = this.element.getElementsByClassName("js-subnav__close-btn");
    this.firstFocusable = getFirstFocusable(this);
    this.showClass = "subnav__wrapper--is-visible";
    this.collapsedLayoutClass = "subnav--collapsed";
    initSideNav(this);
  };

  function getFirstFocusable(sidenav) {
    // get first focusable element inside the subnav
    if (sidenav.navList.length == 0) return;
    var focusableEle = sidenav.navList[0].querySelectorAll('[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary'),
      firstFocusable = false;
    for (var i = 0; i < focusableEle.length; i++) {
      if (focusableEle[i].offsetWidth || focusableEle[i].offsetHeight || focusableEle[i].getClientRects().length) {
        firstFocusable = focusableEle[i];
        break;
      }
    }

    return firstFocusable;
  }

  function initSideNav(sidenav) {
    checkSideNavLayout(sidenav); // switch from --compressed to --expanded layout
    initSideNavToggle(sidenav); // mobile behavior + layout update on resize
  }

  function initSideNavToggle(sidenav) {
    // custom event emitted when window is resized
    sidenav.element.addEventListener("update-sidenav", function (event) {
      checkSideNavLayout(sidenav);
    });

    // mobile only
    if (sidenav.control.length == 0 || sidenav.navList.length == 0) return;
    sidenav.control[0].addEventListener("click", function (event) {
      // open sidenav
      openSideNav(sidenav, event);
    });
    sidenav.element.addEventListener("click", function (event) {
      // close sidenav when clicking on close button/bg layer
      if (event.target.closest(".js-subnav__close-btn") || Util.hasClass(event.target, "js-subnav__wrapper")) {
        closeSideNav(sidenav, event);
      }
    });
  }

  function openSideNav(sidenav, event) {
    // open side nav - mobile only
    event.preventDefault();
    sidenav.selectedTrigger = event.target;
    event.target.setAttribute("aria-expanded", "true");
    Util.addClass(sidenav.navList[0], sidenav.showClass);
    sidenav.navList[0].addEventListener("transitionend", function cb(event) {
      sidenav.navList[0].removeEventListener("transitionend", cb);
      sidenav.firstFocusable.focus();
    });
  }

  function closeSideNav(sidenav, event, bool) {
    // close side sidenav - mobile only
    if (!Util.hasClass(sidenav.navList[0], sidenav.showClass)) return;
    if (event) event.preventDefault();
    Util.removeClass(sidenav.navList[0], sidenav.showClass);
    if (!sidenav.selectedTrigger) return;
    sidenav.selectedTrigger.setAttribute("aria-expanded", "false");
    if (!bool) sidenav.selectedTrigger.focus();
    sidenav.selectedTrigger = false;
  }

  function checkSideNavLayout(sidenav) {
    // switch from --compressed to --expanded layout
    var layout = getComputedStyle(sidenav.element, ":before").getPropertyValue("content").replace(/\'|"/g, "");
    if (layout != "expanded" && layout != "collapsed") return;
    Util.toggleClass(sidenav.element, sidenav.collapsedLayoutClass, layout != "expanded");
  }

  var sideNav = document.getElementsByClassName("js-subnav"),
    SideNavArray = [],
    j = 0;
  if (sideNav.length > 0) {
    for (var i = 0; i < sideNav.length; i++) {
      var beforeContent = getComputedStyle(sideNav[i], ":before").getPropertyValue("content");
      if (beforeContent && beforeContent != "" && beforeContent != "none") {
        j = j + 1;
      }
      (function (i) {
        SideNavArray.push(new SideNav(sideNav[i]));
      })(i);
    }

    if (j > 0) {
      // on resize - update sidenav layout
      var resizingId = false,
        customEvent = new CustomEvent("update-sidenav");
      window.addEventListener("resize", function (event) {
        clearTimeout(resizingId);
        resizingId = setTimeout(doneResizing, 300);
      });

      function doneResizing() {
        for (var i = 0; i < SideNavArray.length; i++) {
          (function (i) {
            SideNavArray[i].element.dispatchEvent(customEvent);
          })(i);
        }
      }

      window.requestAnimationFrame // init table layout
        ? window.requestAnimationFrame(doneResizing)
        : doneResizing();
    }

    // listen for key events
    window.addEventListener("keyup", function (event) {
      if ((event.keyCode && event.keyCode == 27) || (event.key && event.key.toLowerCase() == "escape")) {
        // listen for esc key - close navigation on mobile if open
        for (var i = 0; i < SideNavArray.length; i++) {
          (function (i) {
            closeSideNav(SideNavArray[i], event);
          })(i);
        }
      }
      if ((event.keyCode && event.keyCode == 9) || (event.key && event.key.toLowerCase() == "tab")) {
        // listen for tab key - close navigation on mobile if open when nav loses focus
        if (document.activeElement.closest(".js-subnav__wrapper")) return;
        for (var i = 0; i < SideNavArray.length; i++) {
          (function (i) {
            closeSideNav(SideNavArray[i], event, true);
          })(i);
        }
      }
    });
  }
})();

// File#: _2_flexi-header
// Usage: codyhouse.co/license
(function () {
  var flexHeader = document.getElementsByClassName("js-f-header");
  if (flexHeader.length > 0) {
    var menuTrigger = flexHeader[0].getElementsByClassName("js-anim-menu-btn")[0],
      firstFocusableElement = getMenuFirstFocusable();

    // we'll use these to store the node that needs to receive focus when the mobile menu is closed
    var focusMenu = false;

    menuTrigger.addEventListener("anim-menu-btn-clicked", function (event) {
      toggleMenuNavigation(event.detail);
    });

    // listen for key events
    window.addEventListener("keyup", function (event) {
      // listen for esc key
      if ((event.keyCode && event.keyCode == 27) || (event.key && event.key.toLowerCase() == "escape")) {
        // close navigation on mobile if open
        if (menuTrigger.getAttribute("aria-expanded") == "true" && isVisible(menuTrigger)) {
          focusMenu = menuTrigger; // move focus to menu trigger when menu is close
          menuTrigger.click();
        }
      }
      // listen for tab key
      if ((event.keyCode && event.keyCode == 9) || (event.key && event.key.toLowerCase() == "tab")) {
        // close navigation on mobile if open when nav loses focus
        if (menuTrigger.getAttribute("aria-expanded") == "true" && isVisible(menuTrigger) && !document.activeElement.closest(".js-f-header")) menuTrigger.click();
      }
    });

    // listen for resize
    var resizingId = false;
    window.addEventListener("resize", function () {
      clearTimeout(resizingId);
      resizingId = setTimeout(doneResizing, 500);
    });

    function getMenuFirstFocusable() {
      var focusableEle = flexHeader[0].getElementsByClassName("f-header__nav")[0].querySelectorAll('[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary'),
        firstFocusable = false;
      for (var i = 0; i < focusableEle.length; i++) {
        if (focusableEle[i].offsetWidth || focusableEle[i].offsetHeight || focusableEle[i].getClientRects().length) {
          firstFocusable = focusableEle[i];
          break;
        }
      }

      return firstFocusable;
    }

    function isVisible(element) {
      return element.offsetWidth || element.offsetHeight || element.getClientRects().length;
    }

    function doneResizing() {
      if (!isVisible(menuTrigger) && Util.hasClass(flexHeader[0], "f-header--expanded")) {
        menuTrigger.click();
      }
    }

    function toggleMenuNavigation(bool) {
      // toggle menu visibility on small devices
      Util.toggleClass(document.getElementsByClassName("f-header__nav")[0], "f-header__nav--is-visible", bool);
      Util.toggleClass(flexHeader[0], "f-header--expanded", bool);
      menuTrigger.setAttribute("aria-expanded", bool);
      if (bool) firstFocusableElement.focus();
      // move focus to first focusable element
      else if (focusMenu) {
        focusMenu.focus();
        focusMenu = false;
      }
    }
  }
})();

// File#: _3_hiding-nav
// Usage: codyhouse.co/license
(function () {
  var hidingNav = document.getElementsByClassName("js-hide-nav");
  if (hidingNav.length > 0 && window.requestAnimationFrame) {
    var mainNav = Array.prototype.filter.call(hidingNav, function (element) {
        return Util.hasClass(element, "js-hide-nav--main");
      }),
      subNav = Array.prototype.filter.call(hidingNav, function (element) {
        return Util.hasClass(element, "js-hide-nav--sub");
      });

    var scrolling = false,
      previousTop = window.scrollY,
      currentTop = window.scrollY,
      scrollDelta = 10,
      scrollOffset = 150, // scrollY needs to be bigger than scrollOffset to hide navigation
      headerHeight = 0;

    var navIsFixed = false; // check if main navigation is fixed
    if (mainNav.length > 0 && Util.hasClass(mainNav[0], "hide-nav--fixed")) navIsFixed = true;

    // store button that triggers navigation on mobile
    var triggerMobile = getTriggerMobileMenu();
    var prevElement = createPrevElement();
    var mainNavTop = 0;
    // list of classes the hide-nav has when it is expanded -> do not hide if it has those classes
    var navOpenClasses = hidingNav[0].getAttribute("data-nav-target-class"),
      navOpenArrayClasses = [];
    if (navOpenClasses) navOpenArrayClasses = navOpenClasses.split(" ");
    getMainNavTop();
    if (mainNavTop > 0) {
      scrollOffset = scrollOffset + mainNavTop;
    }

    // init navigation and listen to window scroll event
    getHeaderHeight();
    initSecondaryNav();
    initFixedNav();
    resetHideNav();
    window.addEventListener("scroll", function (event) {
      if (scrolling) return;
      scrolling = true;
      window.requestAnimationFrame(resetHideNav);
    });

    window.addEventListener("resize", function (event) {
      if (scrolling) return;
      scrolling = true;
      window.requestAnimationFrame(function () {
        if (headerHeight > 0) {
          getMainNavTop();
          getHeaderHeight();
          initSecondaryNav();
          initFixedNav();
        }
        // reset both navigation
        hideNavScrollUp();

        scrolling = false;
      });
    });

    function getHeaderHeight() {
      headerHeight = mainNav[0].offsetHeight;
    }

    function initSecondaryNav() {
      // if there's a secondary nav, set its top equal to the header height
      if (subNav.length < 1 || mainNav.length < 1) return;
      subNav[0].style.top = headerHeight - 1 + "px";
    }

    function initFixedNav() {
      if (!navIsFixed || mainNav.length < 1) return;
      mainNav[0].style.marginBottom = "-" + headerHeight + "px";
    }

    function resetHideNav() {
      // check if navs need to be hidden/revealed
      currentTop = window.scrollY;
      if (currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
        hideNavScrollDown();
      } else if (previousTop - currentTop > scrollDelta || (previousTop - currentTop > 0 && currentTop < scrollOffset)) {
        hideNavScrollUp();
      } else if (previousTop - currentTop > 0 && subNav.length > 0 && subNav[0].getBoundingClientRect().top > 0) {
        setTranslate(subNav[0], "0%");
      }
      // if primary nav is fixed -> toggle bg class
      if (navIsFixed) {
        var scrollTop = window.scrollY || window.pageYOffset;
        Util.toggleClass(mainNav[0], "hide-nav--has-bg", scrollTop > headerHeight + mainNavTop);
      }
      previousTop = currentTop;
      scrolling = false;
    }

    function hideNavScrollDown() {
      // if there's a secondary nav -> it has to reach the top before hiding nav
      if (subNav.length > 0 && subNav[0].getBoundingClientRect().top > headerHeight) return;
      // on mobile -> hide navigation only if dropdown is not open
      if (triggerMobile && triggerMobile.getAttribute("aria-expanded") == "true") return;
      // check if main nav has one of the following classes
      if (mainNav.length > 0 && (!navOpenClasses || !checkNavExpanded())) {
        setTranslate(mainNav[0], "-100%");
        mainNav[0].addEventListener("transitionend", addOffCanvasClass);
      }
      if (subNav.length > 0) setTranslate(subNav[0], "-" + headerHeight + "px");
    }

    function hideNavScrollUp() {
      if (mainNav.length > 0) {
        setTranslate(mainNav[0], "0%");
        Util.removeClass(mainNav[0], "hide-nav--off-canvas");
        mainNav[0].removeEventListener("transitionend", addOffCanvasClass);
      }
      if (subNav.length > 0) setTranslate(subNav[0], "0%");
    }

    function addOffCanvasClass() {
      mainNav[0].removeEventListener("transitionend", addOffCanvasClass);
      Util.addClass(mainNav[0], "hide-nav--off-canvas");
    }

    function setTranslate(element, val) {
      element.style.transform = "translateY(" + val + ")";
    }

    function getTriggerMobileMenu() {
      // store trigger that toggle mobile navigation dropdown
      var triggerMobileClass = hidingNav[0].getAttribute("data-mobile-trigger");
      if (!triggerMobileClass) return false;
      if (triggerMobileClass.indexOf("#") == 0) {
        // get trigger by ID
        var trigger = document.getElementById(triggerMobileClass.replace("#", ""));
        if (trigger) return trigger;
      } else {
        // get trigger by class name
        var trigger = hidingNav[0].getElementsByClassName(triggerMobileClass);
        if (trigger.length > 0) return trigger[0];
      }

      return false;
    }

    function createPrevElement() {
      // create element to be inserted right before the mainNav to get its top value
      if (mainNav.length < 1) return false;
      var newElement = document.createElement("div");
      newElement.setAttribute("aria-hidden", "true");
      mainNav[0].parentElement.insertBefore(newElement, mainNav[0]);
      var prevElement = mainNav[0].previousElementSibling;
      prevElement.style.opacity = "0";
      return prevElement;
    }

    function getMainNavTop() {
      if (!prevElement) return;
      mainNavTop = prevElement.getBoundingClientRect().top + window.scrollY;
    }

    function checkNavExpanded() {
      var navIsOpen = false;
      for (var i = 0; i < navOpenArrayClasses.length; i++) {
        if (Util.hasClass(mainNav[0], navOpenArrayClasses[i].trim())) {
          navIsOpen = true;
          break;
        }
      }
      return navIsOpen;
    }
  } else {
    // if window requestAnimationFrame is not supported -> add bg class to fixed header
    var mainNav = document.getElementsByClassName("js-hide-nav--main");
    if (mainNav.length < 1) return;
    if (Util.hasClass(mainNav[0], "hide-nav--fixed")) Util.addClass(mainNav[0], "hide-nav--has-bg");
  }
})();

// This function helps add and remove js and css files during a page transition
function loadjscssfile(filename, filetype) {
  if (filetype == "js") {
    //if filename is a external JavaScript file
    const existingScript = document.querySelector('script[src="${filename}"]');
    if (existingScript) {
      existingScript.remove();
    }
    var fileref = document.createElement("script");
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", filename);
  } else if (filetype == "css") {
    //if filename is an external CSS file
    const existingCSS = document.querySelector(`link[href='${filename}']`);
    if (existingCSS) {
      existingCSS.remove();
    }
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", filename);
  }
  if (typeof fileref != "undefined") document.getElementsByTagName("head")[0].appendChild(fileref);
}

barba.hooks.beforeEnter(({ current, next }) => {
  // Set <body> classes for the 'next' page
  if (current.container) {
    // // only run during a page transition - not initial load
    let nextHtml = next.html;
    let response = nextHtml.replace(/(<\/?)body( .+?)?>/gi, "$1notbody$2>", nextHtml);
    let bodyClasses = $(response).filter("notbody").attr("class");
    $("body").attr("class", bodyClasses);

    // ELEMENTOR
    // Where the magic happens - this loads the new Elementor styles and removes the old styles
    if (bodyClasses.includes("elementor-page")) {
      let currentPageId = current.container.querySelector(".elementor").getAttribute("data-elementor-id");
      let nextPageId = next.container.querySelector(".elementor").getAttribute("data-elementor-id");
      let oldScriptURL = "/wp-content/uploads/elementor/css/post-" + currentPageId + ".css";
      let newScriptURL = "/wp-content/uploads/elementor/css/post-" + nextPageId + ".css"; // Add this for cache fix: ?cachebuster=' + new Date().getTime()
      const oldElementorScript = document.querySelector('link[src="' + oldScriptURL + '"]');
      if (oldElementorScript) {
        oldElementorScript.remove();
      }
      loadjscssfile(newScriptURL, "css");
    }
  }

  // GRAVITY FORMS
  const baseURL = window.location.hostname;
  const protocol = window.location.protocol;

  // Here we are manually reloading the gravity form scripts and styles. If you find that you get errors in future with missing assets, simply add them below.
  const gravityFormJS = "/wp-content/plugins/gravityforms/js/gravityforms.min.js";
  const gravityFormsJquery = "/wp-content/plugins/gravityforms/js/jquery.json.min.js";
  const gformReset = "/wp-content/plugins/gravityforms/css/formreset.min.css";
  const gformMainCSS = "/wp-content/plugins/gravityforms/css/formsmain.min.css";
  const gformReadyclass = "/wp-content/plugins/gravityforms/css/readyclass.min.css";
  const gformBrowser = "/wp-content/plugins/gravityforms/css/browsers.min.css";
  const gformVariables =
    'var gf_global = {"gf_currency_config":{"name":"Australian Dollar","symbol_left":"$","symbol_right":"","symbol_padding":" ","thousand_separator":",","decimal_separator":".","decimals":2},"base_url":"' + protocol + "//" + baseURL + '/wp-content/plugins/gravityforms","number_formats":[],"spinnerUrl":"' + protocol + "//" + baseURL + '/wp-content/plugins/gravityforms/images/spinner.gif"};';
  const gformWrapper = next.container.querySelectorAll(".gform_wrapper");
  //  const gformSomethingElse = '/wp-content/plugins/gravityforms/css/somethingElse.min.css';

  if (gformWrapper) {
    // run if the page contains a form
    const gformVariablesScript = document.createElement("script");
    gformVariablesScript.innerHTML = gformVariables;
    document.body.appendChild(gformVariablesScript);

    loadjscssfile(gravityFormJS, "js");
    loadjscssfile(gravityFormsJquery, "js");
    loadjscssfile(gformReset, "css");
    loadjscssfile(gformMainCSS, "css");
    loadjscssfile(gformReadyclass, "css");
    loadjscssfile(gformBrowser, "css");
    // loadjscssfile(gformSomethingElse, 'css')

    if (window["gformInitDatepicker"]) {
      gformInitDatepicker();
    }

    gformWrapper.forEach(element => {
      const parent = element.parentElement;
      const scripts = parent.querySelectorAll("script");
      scripts.forEach(script => {
        const scriptCode = script.innerHTML;
        const newScript = document.createElement("script");
        script.remove();
        newScript.innerHTML = scriptCode;
        parent.appendChild(newScript);
      });
    });

    // ALLOW ELEMENTOR VIDEOS TO AUTOPLAY AFTER TRANSITION
    let elementorVideos = document.querySelectorAll(".elementor-video");
    if (typeof elementorVideos != "undefined" && elementorVideos != null) {
      elementorVideos.forEach(video => {
        video.play();
      });
    }

    if (current.container) {
      // only run during a page transition - not initial load
      // add any custom JS here that you would like to load on each page
      elementorFrontend.init();
    }
  }
});

const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

function leaveAnimation(e) {
  return new Promise(async resolve => {
    await tl
      .to(e, {
        duration: 1.5,
        y: -100,
        opacity: 0
      })
      // add any animation you like here
      .then();
    resolve();

    setTimeout(function () {
      e.style.opacity = "0";
    }, 4000);
  });
}

function enterAnimation(e) {
  return new Promise(async resolve => {
    await tl
      .from(e, {
        duration: 1.5,
        y: 100,
        opacity: 0
      })
      // add any animation you like here
      .then();
    resolve();
  });
}

barba.init({
  timeout: 5000,
  debug: false, // turn this to "true" to debug
  transitions: [
    {
      sync: false,
      leave: ({ current }) => leaveAnimation(current.container),
      enter: ({ next }) => enterAnimation(next.container)
    }
  ]
});
