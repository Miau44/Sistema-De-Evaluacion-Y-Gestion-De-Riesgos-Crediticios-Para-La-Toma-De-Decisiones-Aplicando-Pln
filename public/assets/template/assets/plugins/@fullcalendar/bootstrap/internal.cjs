'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var internal_cjs = require('@fullcalendar/core/internal.cjs');

class BootstrapTheme extends internal_cjs.Theme {
}
BootstrapTheme.prototype.classes = {
    root: 'fc-theme-bootstrap',
    table: 'table-bordered',
    tableCellShaded: 'table-active',
    buttonGroup: 'btn-group',
    button: 'btn btn-primary',
    buttonActive: 'active',
    popover: 'popover',
    popoverHeader: 'popover-header',
    popoverContent: 'popover-body',
};
BootstrapTheme.prototype.baseIconClass = 'fa';
BootstrapTheme.prototype.iconClasses = {
    close: 'fa-times',
    prev: 'fa-chevron-left',
    next: 'fa-chevron-right',
    prevYear: 'fa-angle-double-left',
    nextYear: 'fa-angle-double-right',
};
BootstrapTheme.prototype.rtlIconClasses = {
    prev: 'fa-chevron-right',
    next: 'fa-chevron-left',
    prevYear: 'fa-angle-double-right',
    nextYear: 'fa-angle-double-left',
};
BootstrapTheme.prototype.iconOverrideOption = 'bootstrapFontAwesome'; // TODO: make TS-friendly. move the option-processing into this plugin
BootstrapTheme.prototype.iconOverrideCustomButtonOption = 'bootstrapFontAwesome';
BootstrapTheme.prototype.iconOverridePrefix = 'fa-';

var css_248z = ".fc-theme-bootstrap a:not([href]){color:inherit}.fc-theme-bootstrap .fc-more-link:hover{text-decoration:none}";
internal_cjs.injectStyles(css_248z);

exports.BootstrapTheme = BootstrapTheme;
