/*global define*/
define(['brease/core/Decorator', 'brease/events/BreaseEvent', 'brease/enum/Enum'], function (Decorator, BreaseEvent, Enum) {

    'use strict';

    var CultureDependency = function () {
        this.initType = Decorator.TYPE_PRE;
    },
    dependency = "culture",
    changeHandler = "cultureChangeHandler";

    CultureDependency.prototype = new Decorator();
    CultureDependency.prototype.constructor = CultureDependency;

    var instance = new CultureDependency();

    instance.methodsToAdd = {

        init: function (initialDependency) {
            if (this[changeHandler] === undefined) {
                throw new Error('widget \u00BB' + this.elem.id + '\u00AB: decoration with "' + instance.constructor.name + '" requires method "' + changeHandler + '"');
            }
            var widget = this;
            this.dependencies[dependency] = {
                state: Enum.Dependency.INACTIVE,
                suspend: function () {
                    if (widget.dependencies[dependency].state === Enum.Dependency.ACTIVE) {
                        widget.dependencies[dependency].stored = brease.culture.getCurrentCulture().key;
                        setState.call(widget, Enum.Dependency.SUSPENDED);
                    }
                },
                wake: function (e) {
                    if (widget.dependencies[dependency].state === Enum.Dependency.SUSPENDED) {
                        setState.call(widget, Enum.Dependency.ACTIVE);
                        if (widget.dependencies[dependency].stored !== brease.culture.getCurrentCulture().key) {
                            widget[changeHandler].call(widget, e);
                        }
                    }
                }
            };
            if (initialDependency === true) {
                this.setCultureDependency(initialDependency);
            }
        },

        setCultureDependency: function (flag) {
            if (flag === true) {
                setState.call(this, Enum.Dependency.ACTIVE);
            } else {
                setState.call(this, Enum.Dependency.INACTIVE);
            }
        },

        dispose: function () {
            this.dependencies[dependency] = null;
            removeListener.call(this);
        }

    };

    function setState(state) {
        //console.log('%c' + this.elem.id + '.dependencies[' + dependency + '].state=' + state, 'color:#cccc00');
        this.dependencies[dependency].state = state;
        if (state === Enum.Dependency.ACTIVE) {
            addListener.call(this);
        } else {
            removeListener.call(this);
        }
    }

    function addListener() {
        document.body.addEventListener(BreaseEvent.CULTURE_CHANGED, this._bind(changeHandler));
    }

    function removeListener() {
        document.body.removeEventListener(BreaseEvent.CULTURE_CHANGED, this._bind(changeHandler));
    }

    return instance;
});