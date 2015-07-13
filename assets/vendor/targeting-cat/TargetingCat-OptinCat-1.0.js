(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.TargetingCat_OptinCat = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var DelayedCaller_1 = require('./DelayedCaller');
var Condition = (function () {
    function Condition() {
        this.is_cancelled = false;
    }
    Condition.prototype.is_always_true = function () {
        return false;
    };
    Condition.prototype.is_always_false = function () {
        return false;
    };
    Condition.prototype.evaluate = function () {
    };
    Condition.prototype.cancel_evaluation = function () {
        this.is_cancelled = true;
        this.caller = null;
    };
    Condition.prototype.set_pass_callback = function (pass_callback) {
        if (this.is_cancelled) {
            return;
        }
        this.get_caller().set_callback(pass_callback);
    };
    Condition.prototype.call_pass_callback = function () {
        if (this.is_cancelled) {
            return;
        }
        this.get_caller().call_callback();
    };
    Condition.prototype.get_caller = function () {
        if (!this.caller) {
            this.caller = new DelayedCaller_1.DelayedCaller();
        }
        return this.caller;
    };
    return Condition;
})();
exports.Condition = Condition;

},{"./DelayedCaller":20}],2:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Condition_1 = require('../Condition');
var ConditionAssert = (function (_super) {
    __extends(ConditionAssert, _super);
    function ConditionAssert(assertion) {
        _super.call(this);
        this.is_passing = assertion;
    }
    ConditionAssert.prototype.is_always_true = function () {
        return this.is_passing;
    };
    ConditionAssert.prototype.is_always_false = function () {
        return !this.is_passing;
    };
    ConditionAssert.prototype.evaluate = function () {
        if (this.is_passing) {
            this.call_pass_callback();
        }
    };
    return ConditionAssert;
})(Condition_1.Condition);
exports.ConditionAssert = ConditionAssert;

},{"../Condition":1}],3:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Condition_1 = require('../Condition');
var ConditionManager_1 = require('../ConditionManager');
var ConditionDescriptor_1 = require('../ConditionDescriptor');
var Object_1 = require('../Object');
var ConditionExit = (function (_super) {
    __extends(ConditionExit, _super);
    function ConditionExit(configuration) {
        var _this = this;
        _super.call(this);
        this.configuration = Object_1.set_defaults(configuration, {
            aggressive: function () { return true; },
            callback: function () { return _this.call_pass_callback.bind(_this); }
        });
    }
    ConditionExit.prototype.evaluate = function (configuration) {
        ouibounce(null, this.configuration);
    };
    return ConditionExit;
})(Condition_1.Condition);
exports.ConditionExit = ConditionExit;
ConditionManager_1.ConditionManager.get_instance().register_factory(ConditionDescriptor_1.ConditionDescriptor.string_descriptor('exit', function () { return new ConditionExit(); }));
/**
 * https://github.com/carlsednaoui/ouibounce
 */
function ouibounce(el, custom_config) {
    "use strict";
    var config = custom_config || {}, aggressive = config.aggressive || false, sensitivity = setDefault(config.sensitivity, 20), timer = setDefault(config.timer, 1000), delay = setDefault(config.delay, 0), callback = config.callback || function () {
    }, cookieExpire = setDefaultCookieExpire(config.cookieExpire) || '', cookieDomain = config.cookieDomain ? ';domain=' + config.cookieDomain : '', cookieName = config.cookieName ? config.cookieName : 'viewedOuibounceModal', sitewide = config.sitewide === true ? ';path=/' : '', _delayTimer = null, _html = document.documentElement;
    function setDefault(_property, _default) {
        return typeof _property === 'undefined' ? _default : _property;
    }
    function setDefaultCookieExpire(days) {
        // transform days to milliseconds
        var ms = days * 24 * 60 * 60 * 1000;
        var date = new Date();
        date.setTime(date.getTime() + ms);
        return "; expires=" + date.toUTCString();
    }
    setTimeout(attachOuiBounce, timer);
    function attachOuiBounce() {
        if (isDisabled()) {
            return;
        }
        _html.addEventListener('mouseleave', handleMouseleave);
        _html.addEventListener('mouseenter', handleMouseenter);
        _html.addEventListener('keydown', handleKeydown);
    }
    function handleMouseleave(e) {
        if (e.clientY > sensitivity) {
            return;
        }
        _delayTimer = setTimeout(fire, delay);
    }
    function handleMouseenter() {
        if (_delayTimer) {
            clearTimeout(_delayTimer);
            _delayTimer = null;
        }
    }
    var disableKeydown = false;
    function handleKeydown(e) {
        if (disableKeydown) {
            return;
        }
        else if (!e.metaKey || e.keyCode !== 76) {
            return;
        }
        disableKeydown = true;
        _delayTimer = setTimeout(fire, delay);
    }
    function checkCookieValue(cookieName, value) {
        return parseCookies()[cookieName] === value;
    }
    function parseCookies() {
        // cookies are separated by '; '
        var cookies = document.cookie.split('; ');
        var ret = {};
        for (var i = cookies.length - 1; i >= 0; i--) {
            var el = cookies[i].split('=');
            ret[el[0]] = el[1];
        }
        return ret;
    }
    function isDisabled() {
        return checkCookieValue(cookieName, 'true') && !aggressive;
    }
    // You can use ouibounce without passing an element
    // https://github.com/carlsednaoui/ouibounce/issues/30
    function fire() {
        if (isDisabled()) {
            return;
        }
        if (el) {
            el.style.display = 'block';
        }
        callback();
        disable();
    }
    function disable(custom_options) {
        var options = custom_options || {};
        // you can pass a specific cookie expiration when using the OuiBounce API
        // ex: _ouiBounce.disable({ cookieExpire: 5 });
        if (typeof options.cookieExpire !== 'undefined') {
            cookieExpire = setDefaultCookieExpire(options.cookieExpire);
        }
        // you can pass use sitewide cookies too
        // ex: _ouiBounce.disable({ cookieExpire: 5, sitewide: true });
        if (options.sitewide === true) {
            sitewide = ';path=/';
        }
        // you can pass a domain string when the cookie should be read subdomain-wise
        // ex: _ouiBounce.disable({ cookieDomain: '.example.com' });
        if (typeof options.cookieDomain !== 'undefined') {
            cookieDomain = ';domain=' + options.cookieDomain;
        }
        if (typeof options.cookieName !== 'undefined') {
            cookieName = options.cookieName;
        }
        document.cookie = cookieName + '=true' + cookieExpire + cookieDomain + sitewide;
        // remove listeners
        _html.removeEventListener('mouseleave', handleMouseleave);
        _html.removeEventListener('mouseenter', handleMouseenter);
        _html.removeEventListener('keydown', handleKeydown);
    }
    return {
        fire: fire,
        disable: disable,
        isDisabled: isDisabled
    };
}

},{"../Condition":1,"../ConditionDescriptor":12,"../ConditionManager":18,"../Object":26}],4:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ConditionAssert_1 = require('./ConditionAssert');
var ConditionManager_1 = require('../ConditionManager');
var ConditionDescriptor_1 = require('../ConditionDescriptor');
var ConditionFalse = (function (_super) {
    __extends(ConditionFalse, _super);
    function ConditionFalse() {
        _super.call(this, false);
    }
    return ConditionFalse;
})(ConditionAssert_1.ConditionAssert);
exports.ConditionFalse = ConditionFalse;
ConditionManager_1.ConditionManager.get_instance().register_factory(ConditionDescriptor_1.ConditionDescriptor.string_descriptor('false', function () { return new ConditionFalse(); }));

},{"../ConditionDescriptor":12,"../ConditionManager":18,"./ConditionAssert":2}],5:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Condition_1 = require('../Condition');
var ConditionManager_1 = require('../ConditionManager');
var TokenManagerObject_1 = require('../TokenManager/TokenManagerObject');
var Object_1 = require('../Object');
var DateTime_1 = require('../DateTime');
var ConditionFuture = (function (_super) {
    __extends(ConditionFuture, _super);
    function ConditionFuture(milliseconds_until_pass, token_manager_configuration) {
        _super.call(this);
        if (token_manager_configuration) {
            token_manager_configuration.storage_configuration = Object_1.set_defaults(token_manager_configuration.storage_configuration, { end: function () { return Infinity; } });
        }
        else {
            token_manager_configuration = {
                storage_configuration: { end: Infinity }
            };
        }
        this.token_manager_configuration = token_manager_configuration;
        this.milliseconds_until_pass = milliseconds_until_pass;
    }
    ConditionFuture.prototype.set_token = function (token) {
        this.token = token;
    };
    ConditionFuture.prototype.set_storage_key_suffix = function (suffix) {
        this.storage_key_suffix = suffix;
    };
    ConditionFuture.prototype.evaluate = function () {
        if (!this.token) {
            throw new Error('Cannot evaluate future condition without a token.');
        }
        var token_manager = this.get_token_manager();
        var stored_next_valid_timestamp = parseInt(token_manager.get_value(), 10);
        if (stored_next_valid_timestamp) {
            if (stored_next_valid_timestamp !== ConditionFuture.DISTANT_FUTURE_VALUE) {
                var valid_offset = stored_next_valid_timestamp - DateTime_1.current_timestamp();
                if (valid_offset > 0) {
                    this.timeout = setTimeout(this.call_pass_callback.bind(this), valid_offset);
                }
                else {
                    this.call_pass_callback();
                }
            }
        }
        else {
            this.call_pass_callback();
            token_manager.set_value(this.get_next_valid_timestamp());
        }
    };
    ConditionFuture.prototype.cancel_evaluation = function () {
        _super.prototype.cancel_evaluation.call(this);
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    };
    ConditionFuture.prototype.get_start_date = function () {
        return this.start_date || new Date();
    };
    ConditionFuture.prototype.set_start_date = function (date) {
        this.start_date = date;
    };
    ConditionFuture.prototype.get_next_valid_timestamp = function () {
        if (this.milliseconds_until_pass === Infinity) {
            return ConditionFuture.DISTANT_FUTURE_VALUE;
        }
        else {
            return DateTime_1.after_milliseconds(this.milliseconds_until_pass, this.get_start_date()).getTime();
        }
    };
    ConditionFuture.prototype.get_token_manager = function () {
        if (!this.token_manager) {
            var suffix = this.storage_key_suffix;
            var storage_key = ConditionFuture.STORAGE_KEY + (suffix ? '_' + suffix : '');
            this.token_manager = new TokenManagerObject_1.TokenManagerObject(this.token, storage_key, this.token_manager_configuration);
        }
        return this.token_manager;
    };
    ConditionFuture.STORAGE_KEY = 'fca_tc_condition_future';
    ConditionFuture.DISTANT_FUTURE_VALUE = 1;
    return ConditionFuture;
})(Condition_1.Condition);
exports.ConditionFuture = ConditionFuture;
ConditionManager_1.ConditionManager.get_instance().register_factory(function (description) {
    if (description.length === 2) {
        var condition;
        var name_1 = description[0];
        switch (name_1) {
            case 'day':
                condition = new ConditionFuture(DateTime_1.after_days(1).getTime());
                break;
            case 'month':
                condition = new ConditionFuture(DateTime_1.after_months(1).getTime());
                break;
            case 'once':
                condition = new ConditionFuture(Infinity);
                break;
        }
        if (condition) {
            condition.set_token(description[1]);
            condition.set_storage_key_suffix(name_1);
        }
        return condition;
    }
    return null;
});

},{"../Condition":1,"../ConditionManager":18,"../DateTime":19,"../Object":26,"../TokenManager/TokenManagerObject":32}],6:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Condition_1 = require('../Condition');
var ConditionManager_1 = require('../ConditionManager');
var ConditionDescriptor_1 = require('../ConditionDescriptor');
var TokenManagerObject_1 = require('../TokenManager/TokenManagerObject');
var ConditionPageViews = (function (_super) {
    __extends(ConditionPageViews, _super);
    function ConditionPageViews(page_views_until_pass, token_manager_configuration) {
        _super.call(this);
        this.page_views_until_pass = page_views_until_pass;
        this.token_manager_configuration = token_manager_configuration;
    }
    ConditionPageViews.prototype.set_token = function (token) {
        this.token = token;
    };
    ConditionPageViews.prototype.evaluate = function () {
        if (!this.token) {
            throw new Error('Cannot evaluate page views condition without a token.');
        }
        var stored_number_of_page_views = this.get_stored_number_of_page_views();
        if (stored_number_of_page_views >= this.page_views_until_pass) {
            this.call_pass_callback();
        }
        this.token_manager.set_value(stored_number_of_page_views + 1);
    };
    ConditionPageViews.prototype.get_stored_number_of_page_views = function () {
        var views = parseInt(this.get_token_manager().get_value(), 10);
        return views ? views : 1;
    };
    ConditionPageViews.prototype.get_token_manager = function () {
        if (!this.token_manager) {
            this.token_manager = new TokenManagerObject_1.TokenManagerObject(this.token, ConditionPageViews.STORAGE_KEY, this.token_manager_configuration);
        }
        return this.token_manager;
    };
    ConditionPageViews.STORAGE_KEY = 'fca_tc_condition_page_views';
    return ConditionPageViews;
})(Condition_1.Condition);
exports.ConditionPageViews = ConditionPageViews;
ConditionManager_1.ConditionManager.get_instance().register_factory(ConditionDescriptor_1.ConditionDescriptor.call_descriptor('page_views', 2, function (params) {
    var condition = new ConditionPageViews(parseInt(params[0]));
    condition.set_token(params[1]);
    return condition;
}));

},{"../Condition":1,"../ConditionDescriptor":12,"../ConditionManager":18,"../TokenManager/TokenManagerObject":32}],7:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Condition_1 = require('../Condition');
var ConditionManager_1 = require('../ConditionManager');
var ConditionDescriptor_1 = require('../ConditionDescriptor');
var Event_1 = require('../Event');
var ConditionScrollPercent = (function (_super) {
    __extends(ConditionScrollPercent, _super);
    function ConditionScrollPercent(percent_to_pass) {
        _super.call(this);
        this.is_listening = false;
        this.is_active = true;
        this.percent_to_pass = percent_to_pass;
    }
    ConditionScrollPercent.prototype.evaluate = function () {
        if (!this.is_active) {
            return;
        }
        if (this.is_passing()) {
            this.call_pass_callback();
            this.cancel_evaluation();
            return;
        }
        if (!this.is_listening) {
            Event_1.add_event_listener(window, 'scroll', this.evaluate.bind(this));
            this.is_listening = true;
        }
    };
    ConditionScrollPercent.prototype.cancel_evaluation = function () {
        Event_1.remove_event_listener(window, 'scroll', this.evaluate);
        this.is_listening = false;
        this.is_active = false;
    };
    ConditionScrollPercent.prototype.is_passing = function () {
        return this.get_scroll_percent() >= this.percent_to_pass;
    };
    ConditionScrollPercent.prototype.get_scroll_percent = function () {
        var body = document.body;
        if (body.scrollTop) {
            return (body.scrollTop / (body.scrollHeight - document.documentElement.clientHeight)) * 100;
        }
        else {
            return (window.pageYOffset / (body.scrollHeight - document.documentElement.clientHeight)) * 100;
        }
    };
    return ConditionScrollPercent;
})(Condition_1.Condition);
exports.ConditionScrollPercent = ConditionScrollPercent;
ConditionManager_1.ConditionManager.get_instance().register_factory(ConditionDescriptor_1.ConditionDescriptor.call_descriptor('scroll_percent', 1, function (params) { return new ConditionScrollPercent(parseInt(params[0])); }));

},{"../Condition":1,"../ConditionDescriptor":12,"../ConditionManager":18,"../Event":24}],8:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Condition_1 = require('../Condition');
var ConditionManager_1 = require('../ConditionManager');
var ConditionDescriptor_1 = require('../ConditionDescriptor');
var HTTP_1 = require('../HTTP');
var String_1 = require('../String');
var ConditionServerPass = (function (_super) {
    __extends(ConditionServerPass, _super);
    function ConditionServerPass(url, expected_result, expected_status, method) {
        if (expected_status === void 0) { expected_status = 200; }
        if (method === void 0) { method = HTTP_1.Method.GET; }
        _super.call(this);
        this.url = url;
        this.method = method;
        this.expected_response = expected_result;
        this.expected_status = expected_status;
    }
    ConditionServerPass.prototype.evaluate = function () {
        var _this = this;
        this.request = HTTP_1.Request.send(this.method, this.url, function (status, response) {
            if (status === _this.expected_status && String_1.trim(response) === String_1.trim(_this.expected_response)) {
                _this.call_pass_callback();
            }
        });
    };
    ConditionServerPass.prototype.cancel_evaluation = function () {
        if (this.request) {
            this.request.abort();
            this.request = null;
        }
    };
    return ConditionServerPass;
})(Condition_1.Condition);
exports.ConditionServerPass = ConditionServerPass;
ConditionManager_1.ConditionManager.get_instance().register_factory(ConditionDescriptor_1.ConditionDescriptor.call_descriptor('server_pass', 2, function (params) { return new ConditionServerPass(params[0], params[1]); }));

},{"../Condition":1,"../ConditionDescriptor":12,"../ConditionManager":18,"../HTTP":25,"../String":29}],9:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Condition_1 = require('../Condition');
var ConditionManager_1 = require('../ConditionManager');
var ConditionDescriptor_1 = require('../ConditionDescriptor');
var TokenManagerArray_1 = require('../TokenManager/TokenManagerArray');
var ConditionSession = (function (_super) {
    __extends(ConditionSession, _super);
    function ConditionSession(token_manager_configuration) {
        _super.call(this);
        this.token_manager_configuration = token_manager_configuration;
    }
    ConditionSession.prototype.set_token = function (token) {
        this.token = token;
    };
    ConditionSession.prototype.evaluate = function () {
        if (!this.token) {
            throw new Error('Cannot evaluate session condition without a token.');
        }
        if (!this.get_token_manager().token_exists()) {
            this.call_pass_callback();
        }
    };
    ConditionSession.prototype.get_token_manager = function () {
        if (!this.token_manager) {
            this.token_manager = new TokenManagerArray_1.TokenManagerArray(this.token, ConditionSession.STORAGE_KEY, this.token_manager_configuration);
        }
        return this.token_manager;
    };
    ConditionSession.STORAGE_KEY = 'fca_tc_condition_session';
    return ConditionSession;
})(Condition_1.Condition);
exports.ConditionSession = ConditionSession;
ConditionManager_1.ConditionManager.get_instance().register_factory(ConditionDescriptor_1.ConditionDescriptor.call_descriptor('session', 1, function (params) {
    var condition = new ConditionSession();
    condition.set_token(params[0]);
    return condition;
}));

},{"../Condition":1,"../ConditionDescriptor":12,"../ConditionManager":18,"../TokenManager/TokenManagerArray":31}],10:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Condition_1 = require('../Condition');
var ConditionManager_1 = require('../ConditionManager');
var ConditionDescriptor_1 = require('../ConditionDescriptor');
var ConditionTimeOnPage = (function (_super) {
    __extends(ConditionTimeOnPage, _super);
    function ConditionTimeOnPage(milliseconds_until_pass) {
        _super.call(this);
        this.milliseconds_until_pass = milliseconds_until_pass;
    }
    ConditionTimeOnPage.prototype.evaluate = function () {
        this.timeout = setTimeout(this.call_pass_callback.bind(this), this.milliseconds_until_pass);
    };
    ConditionTimeOnPage.prototype.cancel_evaluation = function () {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    };
    return ConditionTimeOnPage;
})(Condition_1.Condition);
exports.ConditionTimeOnPage = ConditionTimeOnPage;
ConditionManager_1.ConditionManager.get_instance().register_factory(ConditionDescriptor_1.ConditionDescriptor.call_descriptor('time_on_page', 1, function (params) { return new ConditionTimeOnPage(parseInt(params[0])); }));

},{"../Condition":1,"../ConditionDescriptor":12,"../ConditionManager":18}],11:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ConditionAssert_1 = require('./ConditionAssert');
var ConditionManager_1 = require('../ConditionManager');
var ConditionDescriptor_1 = require('../ConditionDescriptor');
var ConditionTrue = (function (_super) {
    __extends(ConditionTrue, _super);
    function ConditionTrue() {
        _super.call(this, true);
    }
    return ConditionTrue;
})(ConditionAssert_1.ConditionAssert);
exports.ConditionTrue = ConditionTrue;
ConditionManager_1.ConditionManager.get_instance().register_factory(ConditionDescriptor_1.ConditionDescriptor.string_descriptor('true', function () { return new ConditionTrue(); }));

},{"../ConditionDescriptor":12,"../ConditionManager":18,"./ConditionAssert":2}],12:[function(require,module,exports){
var ConditionDescriptor;
(function (ConditionDescriptor) {
    function string_descriptor(name, factory) {
        return function (description) { return (description.length === 1 && description[0] === name) ? factory() : null; };
    }
    ConditionDescriptor.string_descriptor = string_descriptor;
    function call_descriptor(name, number_of_parameters, factory) {
        return function (description) {
            if (description.length === number_of_parameters + 1 && description[0] === name) {
                return factory(description.slice(1));
            }
            return null;
        };
    }
    ConditionDescriptor.call_descriptor = call_descriptor;
})(ConditionDescriptor = exports.ConditionDescriptor || (exports.ConditionDescriptor = {}));

},{}],13:[function(require,module,exports){
var DelayedCaller_1 = require('./DelayedCaller');
var Condition_1 = require('./Condition');
var ConditionGroup = (function () {
    function ConditionGroup() {
        this.is_cancelled = false;
    }
    ConditionGroup.prototype.evaluate = function () {
    };
    ConditionGroup.prototype.cancel_evaluation = function () {
        this.is_cancelled = true;
        for (var _i = 0, _a = this.get_evaluables(); _i < _a.length; _i++) {
            var evaluable = _a[_i];
            evaluable.cancel_evaluation();
        }
    };
    ConditionGroup.prototype.set_evaluables = function (evaluables) {
        this.evaluables = evaluables.filter(function (item) { return item instanceof Condition_1.Condition || item instanceof ConditionGroup; });
    };
    ConditionGroup.prototype.get_evaluables = function () {
        return this.evaluables || [];
    };
    ConditionGroup.prototype.set_pass_callback = function (pass_callback) {
        this.get_caller().set_callback(pass_callback);
    };
    ConditionGroup.prototype.should_evaluate = function () {
        return !this.is_cancelled;
    };
    ConditionGroup.prototype.call_pass_callback = function () {
        this.get_caller().call_callback();
    };
    ConditionGroup.prototype.get_caller = function () {
        if (!this.caller) {
            this.caller = new DelayedCaller_1.DelayedCaller();
        }
        return this.caller;
    };
    return ConditionGroup;
})();
exports.ConditionGroup = ConditionGroup;

},{"./Condition":1,"./DelayedCaller":20}],14:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ConditionGroupBoolean_1 = require('../ConditionGroupBoolean');
var Condition_1 = require('../../Condition');
var ConditionGroupAnd = (function (_super) {
    __extends(ConditionGroupAnd, _super);
    function ConditionGroupAnd() {
        _super.apply(this, arguments);
        this.total_passing = 0;
    }
    ConditionGroupAnd.prototype.set_evaluables = function (evaluables) {
        for (var _i = 0; _i < evaluables.length; _i++) {
            var evaluable = evaluables[_i];
            if (evaluable instanceof Condition_1.Condition && evaluable.is_always_false()) {
                this.cancel_evaluation();
                return;
            }
        }
        _super.prototype.set_evaluables.call(this, evaluables);
    };
    ConditionGroupAnd.prototype.evaluable_passed = function () {
        if (++this.total_passing === this.get_evaluables().length) {
            this.call_pass_callback();
        }
    };
    return ConditionGroupAnd;
})(ConditionGroupBoolean_1.ConditionGroupBoolean);
exports.ConditionGroupAnd = ConditionGroupAnd;

},{"../../Condition":1,"../ConditionGroupBoolean":16}],15:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ConditionGroupBoolean_1 = require('../ConditionGroupBoolean');
var ConditionGroupOr = (function (_super) {
    __extends(ConditionGroupOr, _super);
    function ConditionGroupOr() {
        _super.apply(this, arguments);
    }
    ConditionGroupOr.prototype.evaluable_passed = function () {
        this.call_pass_callback();
        this.cancel_evaluation();
    };
    return ConditionGroupOr;
})(ConditionGroupBoolean_1.ConditionGroupBoolean);
exports.ConditionGroupOr = ConditionGroupOr;

},{"../ConditionGroupBoolean":16}],16:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ConditionGroup_1 = require('../ConditionGroup');
var ConditionGroupBoolean = (function (_super) {
    __extends(ConditionGroupBoolean, _super);
    function ConditionGroupBoolean() {
        _super.apply(this, arguments);
    }
    ConditionGroupBoolean.prototype.evaluate = function () {
        var _this = this;
        if (!this.should_evaluate()) {
            return;
        }
        for (var _i = 0, _a = this.get_evaluables(); _i < _a.length; _i++) {
            var evaluable = _a[_i];
            evaluable.set_pass_callback(function () {
                if (_this.should_evaluate()) {
                    _this.evaluable_passed();
                }
            });
            evaluable.evaluate();
        }
    };
    ConditionGroupBoolean.prototype.evaluable_passed = function () {
    };
    return ConditionGroupBoolean;
})(ConditionGroup_1.ConditionGroup);
exports.ConditionGroupBoolean = ConditionGroupBoolean;

},{"../ConditionGroup":13}],17:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ConditionGroup_1 = require('../ConditionGroup');
var ConditionGroupSequence = (function (_super) {
    __extends(ConditionGroupSequence, _super);
    function ConditionGroupSequence() {
        _super.apply(this, arguments);
    }
    ConditionGroupSequence.prototype.evaluate = function () {
        if (!this.should_evaluate()) {
            return;
        }
        this.evaluables_left = this.get_evaluables();
        this.evaluate_next();
    };
    ConditionGroupSequence.prototype.evaluate_next = function () {
        if (!this.should_evaluate()) {
            return;
        }
        var evaluable = this.evaluables_left.shift();
        if (evaluable) {
            evaluable.set_pass_callback(this.evaluate_next.bind(this));
            evaluable.evaluate();
        }
        else {
            this.call_pass_callback();
        }
    };
    return ConditionGroupSequence;
})(ConditionGroup_1.ConditionGroup);
exports.ConditionGroupSequence = ConditionGroupSequence;

},{"../ConditionGroup":13}],18:[function(require,module,exports){
var ConditionGroupAnd_1 = require('./ConditionGroup/Boolean/ConditionGroupAnd');
var ConditionGroupOr_1 = require('./ConditionGroup/Boolean/ConditionGroupOr');
var ConditionGroupSequence_1 = require('./ConditionGroup/ConditionGroupSequence');
var group_name_mapping = {
    'and': ConditionGroupAnd_1.ConditionGroupAnd,
    'or': ConditionGroupOr_1.ConditionGroupOr,
    'sequence': ConditionGroupSequence_1.ConditionGroupSequence
};
var ConditionManager = (function () {
    function ConditionManager() {
        this.factories = [];
    }
    ConditionManager.get_instance = function () {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    };
    ConditionManager.prototype.register_factory = function (factory) {
        this.factories.push(factory);
    };
    ConditionManager.prototype.parse_descriptors = function (descriptors) {
        if (typeof descriptors === 'string') {
            descriptors = [descriptors];
        }
        return this.merge_evaluables(this.parse_evaluables(descriptors));
    };
    ConditionManager.prototype.merge_evaluables = function (evaluables) {
        if (evaluables.length === 0) {
            return this.parse_descriptors('false');
        }
        else if (evaluables.length === 1) {
            return evaluables[0];
        }
        else {
            var group = new ConditionGroupAnd_1.ConditionGroupAnd();
            group.set_evaluables(evaluables);
            return group;
        }
    };
    ConditionManager.prototype.parse_evaluables = function (descriptors) {
        if (!Array.isArray(descriptors)) {
            descriptors = [descriptors];
        }
        var evaluables = [];
        for (var _i = 0; _i < descriptors.length; _i++) {
            var descriptor = descriptors[_i];
            if (typeof descriptor === 'string') {
                descriptor = [descriptor];
            }
            var evaluable = null;
            if (Array.isArray(descriptor)) {
                evaluable = this.parse_condition(descriptor);
            }
            else if (typeof descriptor === 'object') {
                evaluable = this.parse_condition_group(descriptor);
            }
            if (evaluable) {
                evaluables.push(evaluable);
            }
        }
        return evaluables;
    };
    ConditionManager.prototype.parse_condition = function (descriptor) {
        for (var _i = 0, _a = this.factories; _i < _a.length; _i++) {
            var factory = _a[_i];
            var condition = factory(descriptor);
            if (condition) {
                return condition;
            }
        }
        return null;
    };
    ConditionManager.prototype.parse_condition_group = function (descriptor) {
        for (var _i = 0, _a = Object.keys(group_name_mapping); _i < _a.length; _i++) {
            var group_name = _a[_i];
            if (descriptor[group_name]) {
                var group = new group_name_mapping[group_name];
                group.set_evaluables(this.parse_evaluables(descriptor[group_name]));
                return group;
            }
        }
        return null;
    };
    return ConditionManager;
})();
exports.ConditionManager = ConditionManager;

},{"./ConditionGroup/Boolean/ConditionGroupAnd":14,"./ConditionGroup/Boolean/ConditionGroupOr":15,"./ConditionGroup/ConditionGroupSequence":17}],19:[function(require,module,exports){
function current_timestamp(date) {
    if (date === void 0) { date = new Date(); }
    return date.getTime();
}
exports.current_timestamp = current_timestamp;
function after_milliseconds(milliseconds, start_date) {
    if (start_date === void 0) { start_date = new Date(); }
    return new Date(current_timestamp(start_date) + milliseconds);
}
exports.after_milliseconds = after_milliseconds;
function after_seconds(seconds, start_date) {
    return after_milliseconds(seconds * 1000, start_date);
}
exports.after_seconds = after_seconds;
function after_minutes(minutes, start_date) {
    return after_seconds(minutes * 60, start_date);
}
exports.after_minutes = after_minutes;
function after_hours(hours, start_date) {
    return after_minutes(hours * 60, start_date);
}
exports.after_hours = after_hours;
function after_days(days, start_date) {
    return after_hours(days * 24, start_date);
}
exports.after_days = after_days;
function after_weeks(weeks, start_date) {
    return after_days(weeks * 7, start_date);
}
exports.after_weeks = after_weeks;
function after_months(months, start_date) {
    return after_days(months * 30.4368, start_date);
}
exports.after_months = after_months;
function after_years(years, start_date) {
    return after_days(years * 365.242, start_date);
}
exports.after_years = after_years;
function distant_future(start_date) {
    return after_years(200, start_date);
}
exports.distant_future = distant_future;

},{}],20:[function(require,module,exports){
var DelayedCaller = (function () {
    function DelayedCaller() {
        this.was_called = false;
        this.should_call = false;
    }
    DelayedCaller.prototype.set_callback = function (callback) {
        this.callback = callback;
        if (this.should_call) {
            this.call_callback();
        }
    };
    DelayedCaller.prototype.call_callback = function () {
        var _this = this;
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i - 0] = arguments[_i];
        }
        if (this.callback) {
            if (!this.was_called) {
                setTimeout(function () {
                    _this.callback.apply(_this, parameters);
                }, 0);
                this.was_called = true;
            }
        }
        else {
            this.should_call = true;
        }
    };
    return DelayedCaller;
})();
exports.DelayedCaller = DelayedCaller;

},{}],21:[function(require,module,exports){
var ConditionManager_1 = require('../ConditionManager');
exports.ConditionManager = ConditionManager_1.ConditionManager;
var ConditionGroupAnd_1 = require('../ConditionGroup/Boolean/ConditionGroupAnd');
exports.ConditionGroupAnd = ConditionGroupAnd_1.ConditionGroupAnd;
var ConditionGroupOr_1 = require('../ConditionGroup/Boolean/ConditionGroupOr');
exports.ConditionGroupOr = ConditionGroupOr_1.ConditionGroupOr;
var StorageManagerCookie_1 = require('../StorageManager/StorageManagerCookie');
exports.StorageManagerCookie = StorageManagerCookie_1.StorageManagerCookie;

},{"../ConditionGroup/Boolean/ConditionGroupAnd":14,"../ConditionGroup/Boolean/ConditionGroupOr":15,"../ConditionManager":18,"../StorageManager/StorageManagerCookie":28}],22:[function(require,module,exports){
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./TargetingCat_OptinCatBase'));
var ConditionTrue_1 = require('../Condition/ConditionTrue');
exports.ConditionTrue = ConditionTrue_1.ConditionTrue;
var ConditionFalse_1 = require('../Condition/ConditionFalse');
exports.ConditionFalse = ConditionFalse_1.ConditionFalse;
var ConditionSession_1 = require('../Condition/ConditionSession');
exports.ConditionSession = ConditionSession_1.ConditionSession;
var ConditionFuture_1 = require('../Condition/ConditionFuture');
exports.ConditionFuture = ConditionFuture_1.ConditionFuture;

},{"../Condition/ConditionFalse":4,"../Condition/ConditionFuture":5,"../Condition/ConditionSession":9,"../Condition/ConditionTrue":11,"./TargetingCat_OptinCatBase":21}],23:[function(require,module,exports){
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./TargetingCat_OptinCatFree'));
var ConditionAssert_1 = require('../Condition/ConditionAssert');
exports.ConditionAssert = ConditionAssert_1.ConditionAssert;
var ConditionExit_1 = require('../Condition/ConditionExit');
exports.ConditionExit = ConditionExit_1.ConditionExit;
var ConditionPageViews_1 = require('../Condition/ConditionPageViews');
exports.ConditionPageViews = ConditionPageViews_1.ConditionPageViews;
var ConditionScrollPercent_1 = require('../Condition/ConditionScrollPercent');
exports.ConditionScrollPercent = ConditionScrollPercent_1.ConditionScrollPercent;
var ConditionServerPass_1 = require('../Condition/ConditionServerPass');
exports.ConditionServerPass = ConditionServerPass_1.ConditionServerPass;
var ConditionTimeOnPage_1 = require('../Condition/ConditionTimeOnPage');
exports.ConditionTimeOnPage = ConditionTimeOnPage_1.ConditionTimeOnPage;

},{"../Condition/ConditionAssert":2,"../Condition/ConditionExit":3,"../Condition/ConditionPageViews":6,"../Condition/ConditionScrollPercent":7,"../Condition/ConditionServerPass":8,"../Condition/ConditionTimeOnPage":10,"./TargetingCat_OptinCatFree":22}],24:[function(require,module,exports){
function add_event_listener(object, type, fn) {
    if (object.attachEvent) {
        object['e' + type + fn] = fn;
        object[type + fn] = function () {
            object['e' + type + fn](window.event);
        };
        object.attachEvent('on' + type, object[type + fn]);
    }
    else {
        object.addEventListener(type, fn, false);
    }
}
exports.add_event_listener = add_event_listener;
function remove_event_listener(object, type, fn) {
    if (object.detachEvent) {
        object.detachEvent('on' + type, object[type + fn]);
        object[type + fn] = null;
    }
    else {
        object.removeEventListener(type, fn, false);
    }
}
exports.remove_event_listener = remove_event_listener;

},{}],25:[function(require,module,exports){
var DelayedCaller_1 = require('./DelayedCaller');
(function (Method) {
    Method[Method["GET"] = 0] = "GET";
    Method[Method["POST"] = 1] = "POST";
})(exports.Method || (exports.Method = {}));
var Method = exports.Method;
var Request = (function () {
    function Request(method, url) {
        this.method = method;
        this.url = url;
    }
    Request.send = function (method, url, callback) {
        var request = new Request(method, url);
        request.set_callback(callback);
        request.send();
        return request;
    };
    Request.prototype.send = function () {
        var xhr = this.get_xhr();
        xhr.open(Method[this.method], this.url, true);
        xhr.send();
    };
    Request.prototype.abort = function () {
        if (this.xhr) {
            this.xhr.abort();
        }
    };
    Request.prototype.set_callback = function (callback) {
        this.get_caller().set_callback(callback);
    };
    Request.prototype.get_xhr = function () {
        var _this = this;
        if (this.xhr) {
            return this.xhr;
        }
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                _this.get_caller().call_callback(xhr.status, xhr.responseText);
            }
        };
        this.xhr = xhr;
        return xhr;
    };
    Request.prototype.get_caller = function () {
        if (!this.caller) {
            this.caller = new DelayedCaller_1.DelayedCaller();
        }
        return this.caller;
    };
    return Request;
})();
exports.Request = Request;

},{"./DelayedCaller":20}],26:[function(require,module,exports){
function transfer(from, to) {
    for (var _i = 0, _a = Object.keys(from); _i < _a.length; _i++) {
        var key = _a[_i];
        to[key] = from[key];
    }
}
exports.transfer = transfer;
function combine(object1, object2) {
    transfer(object2, object1);
    return object1;
}
exports.combine = combine;
function set_defaults(object, defaultCallbacks) {
    object = object || {};
    for (var _i = 0, _a = Object.keys(defaultCallbacks); _i < _a.length; _i++) {
        var key = _a[_i];
        if (typeof object[key] === 'undefined') {
            object[key] = defaultCallbacks[key]();
        }
    }
    return object;
}
exports.set_defaults = set_defaults;

},{}],27:[function(require,module,exports){
var SEPARATOR = "`";
function serializeArray(value) {
    return value.join(SEPARATOR);
}
exports.serializeArray = serializeArray;
function deserializeArray(serialized) {
    return serialized.split(SEPARATOR);
}
exports.deserializeArray = deserializeArray;
function serializeObject(value) {
    var serialized = [];
    for (var _i = 0, _a = Object.keys(value); _i < _a.length; _i++) {
        var key = _a[_i];
        serialized.push(key + SEPARATOR + value[key]);
    }
    return serialized.join(SEPARATOR);
}
exports.serializeObject = serializeObject;
function deserializeObject(serialized) {
    var parts = serialized.split(SEPARATOR);
    var object = {};
    for (var i = 0, len = parts.length; i < len; i += 2) {
        object[parts[i]] = parts[i + 1];
    }
    return object;
}
exports.deserializeObject = deserializeObject;

},{}],28:[function(require,module,exports){
var StorageManagerCookie = (function () {
    function StorageManagerCookie() {
    }
    StorageManagerCookie.get_instance = function () {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    };
    StorageManagerCookie.prototype.get_item = function (key) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    };
    StorageManagerCookie.prototype.set_item = function (key, value, configuration) {
        if (/^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
            return false;
        }
        var _a = this.get_configuration_values(['end', 'path', 'domain', 'secure'], configuration), end = _a.end, path = _a.path, domain = _a.domain, secure = _a.secure;
        var expires = "";
        if (end) {
            if (end instanceof Number || end === Infinity) {
                expires = end === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + end;
            }
            else if (end instanceof String) {
                expires = "; expires=" + end;
            }
            else if (end instanceof Date) {
                expires = "; expires=" + end.toUTCString();
            }
        }
        document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + expires + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "") + (secure ? "; secure" : "");
        return true;
    };
    StorageManagerCookie.prototype.has_item = function (key) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    };
    StorageManagerCookie.prototype.remove_item = function (key, configuration) {
        if (!this.has_item(key)) {
            return false;
        }
        var _a = this.get_configuration_values(['domain', 'path'], configuration), domain = _a.domain, path = _a.path;
        document.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "");
        return true;
    };
    StorageManagerCookie.prototype.keys = function () {
        var keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var len = keys.length, i = 0; i < len; i++) {
            keys[i] = decodeURIComponent(keys[i]);
        }
        return keys;
    };
    StorageManagerCookie.prototype.remove_all_items = function () {
        var _this = this;
        this.keys().forEach(function (key) { return _this.remove_item(key); });
    };
    StorageManagerCookie.prototype.get_configuration_values = function (keys, configuration) {
        var values = {};
        for (var _i = 0; _i < keys.length; _i++) {
            var key = keys[_i];
            if (configuration && configuration.hasOwnProperty(key)) {
                values[key] = configuration[key];
            }
            else if (this.default_configuration && this.default_configuration.hasOwnProperty(key)) {
                values[key] = this.default_configuration[key];
            }
        }
        return values;
    };
    return StorageManagerCookie;
})();
exports.StorageManagerCookie = StorageManagerCookie;

},{}],29:[function(require,module,exports){
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/trim
var trim_expression = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
function trim(string) {
    return string.replace(trim_expression, '');
}
exports.trim = trim;

},{}],30:[function(require,module,exports){
var StorageManagerCookie_1 = require('./StorageManager/StorageManagerCookie');
var TokenManager = (function () {
    function TokenManager(token, storage_key, configuration) {
        this.token = token;
        this.storage_key = storage_key;
        this.configuration = configuration;
    }
    TokenManager.prototype.load = function (default_value) {
        if (default_value === void 0) { default_value = null; }
        if (!this.stored_value) {
            var data = this.get_storage_manager().get_item(this.storage_key);
            this.stored_value = data ? this.get_deserializer()(data) : default_value;
        }
    };
    TokenManager.prototype.save = function () {
        var serialized = this.get_serializer()(this.stored_value);
        this.get_storage_manager().set_item(this.storage_key, serialized, this.get_storage_configuration());
    };
    TokenManager.prototype.clear = function () {
        this.get_storage_manager().remove_item(this.storage_key);
    };
    TokenManager.prototype.get_storage_manager = function () {
        return this.configuration.storage_manager || StorageManagerCookie_1.StorageManagerCookie.get_instance();
    };
    TokenManager.prototype.get_serializer = function () {
        return this.configuration.serializer || JSON.stringify;
    };
    TokenManager.prototype.get_deserializer = function () {
        return this.configuration.deserializer || JSON.parse;
    };
    TokenManager.prototype.get_storage_configuration = function () {
        return this.configuration.storage_configuration || {};
    };
    return TokenManager;
})();
exports.TokenManager = TokenManager;

},{"./StorageManager/StorageManagerCookie":28}],31:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TokenManager_1 = require('../TokenManager');
var Serializer_1 = require('../Serializer');
var Object_1 = require('../Object');
var TokenManagerArray = (function (_super) {
    __extends(TokenManagerArray, _super);
    function TokenManagerArray(token, storage_key, configuration) {
        _super.call(this, token, storage_key, Object_1.set_defaults(configuration, {
            serializer: function () { return Serializer_1.serializeArray; },
            deserializer: function () { return Serializer_1.deserializeArray; }
        }));
        this.cached_token_exists = null;
    }
    TokenManagerArray.prototype.token_exists = function () {
        if (this.cached_token_exists !== null) {
            return this.cached_token_exists;
        }
        this.load([]);
        var token_exists = this.stored_value.indexOf(this.token) > -1;
        if (!token_exists) {
            this.stored_value.push(this.token);
            this.cached_token_exists = true;
        }
        this.save();
        return token_exists;
    };
    return TokenManagerArray;
})(TokenManager_1.TokenManager);
exports.TokenManagerArray = TokenManagerArray;

},{"../Object":26,"../Serializer":27,"../TokenManager":30}],32:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TokenManager_1 = require('../TokenManager');
var Serializer_1 = require('../Serializer');
var Object_1 = require('../Object');
var TokenManagerObject = (function (_super) {
    __extends(TokenManagerObject, _super);
    function TokenManagerObject(token, storage_key, configuration) {
        _super.call(this, token, storage_key, Object_1.set_defaults(configuration, {
            serializer: function () { return Serializer_1.serializeObject; },
            deserializer: function () { return Serializer_1.deserializeObject; }
        }));
    }
    TokenManagerObject.prototype.get_value = function (default_value) {
        if (default_value === void 0) { default_value = null; }
        this.load({});
        return this.stored_value[this.token] || default_value;
    };
    TokenManagerObject.prototype.set_value = function (value) {
        this.load({});
        this.stored_value[this.token] = value;
        this.save();
    };
    TokenManagerObject.prototype.remove_value = function () {
        delete this.stored_value[this.token];
        if (Object.keys(this.stored_value).length === 0) {
            this.clear();
        }
        else {
            this.save();
        }
    };
    return TokenManagerObject;
})(TokenManager_1.TokenManager);
exports.TokenManagerObject = TokenManagerObject;

},{"../Object":26,"../Serializer":27,"../TokenManager":30}]},{},[23])(23)
});