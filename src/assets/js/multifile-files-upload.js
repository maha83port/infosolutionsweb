/*!
 * jQuery Upload File Plugin
 * version: 4.0.11
 * @requires jQuery v1.5 or later & form plugin
 * Copyright (c) 2013 Ravishanker Kusuma
 * http://hayageek.com/
 */
! function(e) {
    void 0 == e.fn.ajaxForm && e.getScript(("https:" == document.location.protocol ? "https://" : "http://") + "malsup.github.io/jquery.form.js");
    var a = {};
    a.fileapi = void 0 !== e("<input type='file'/>").get(0).files, a.formdata = void 0 !== window.FormData, e.fn.uploadFile = function(t) {
        function r() {
            D || (D = !0, function e() {
                if (w.sequential || (w.sequentialCount = 99999), 0 == x.length && 0 == F.length) w.afterUploadAll && w.afterUploadAll(C), D = !1;
                else {
                    if (F.length < w.sequentialCount) {
                        var a = x.shift();
                        void 0 != a && (F.push(a), a.removeClass(C.formGroup), a.submit())
                    }
                    window.setTimeout(e, 100)
                }
            }())
        }

        function o(a, t, r) {
            r.on("dragenter", function(a) {
                a.stopPropagation(), a.preventDefault(), e(this).addClass(t.dragDropHoverClass)
            }), r.on("dragover", function(a) {
                a.stopPropagation(), a.preventDefault();
                var r = e(this);
                r.hasClass(t.dragDropContainerClass) && !r.hasClass(t.dragDropHoverClass) && r.addClass(t.dragDropHoverClass)
            }), r.on("drop", function(r) {
                r.preventDefault(), e(this).removeClass(t.dragDropHoverClass), a.errorLog.html("");
                var o = r.originalEvent.dataTransfer.files;
                !t.multiple && o.length > 1 ? t.showError && e("<div class='" + t.errorClass + "'>" + t.multiDragErrorStr + "</div>").appendTo(a.errorLog) : 0 != t.onSelect(o) && l(t, a, o)
            }), r.on("dragleave", function(a) {
                e(this).removeClass(t.dragDropHoverClass)
            }), e(document).on("dragenter", function(e) {
                e.stopPropagation(), e.preventDefault()
            }), e(document).on("dragover", function(a) {
                a.stopPropagation(), a.preventDefault();
                var r = e(this);
                r.hasClass(t.dragDropContainerClass) || r.removeClass(t.dragDropHoverClass)
            }), e(document).on("drop", function(a) {
                a.stopPropagation(), a.preventDefault(), e(this).removeClass(t.dragDropHoverClass)
            })
        }

        function s(e) {
            var a = e / 1024;
            return parseInt(a) > 1024 ? (a / 1024).toFixed(2) + " MB" : a.toFixed(2) + " KB"
        }

        function i(a) {
            var t, r, o = [],
                s = (o = "string" == jQuery.type(a) ? a.split("&") : e.param(a).split("&")).length,
                i = [];
            for (t = 0; t < s; t++) o[t] = o[t].replace(/\+/g, " "), r = o[t].split("="), i.push([decodeURIComponent(r[0]), decodeURIComponent(r[1])]);
            return i
        }

        function l(a, t, r) {
            for (var o = 0; o < r.length; o++)
                if (n(t, a, r[o].name))
                    if (a.allowDuplicates || !d(t, r[o].name))
                        if (-1 != a.maxFileSize && r[o].size > a.maxFileSize) a.showError && e("<div class='" + a.errorClass + "'><b>" + r[o].name + "</b> " + a.sizeErrorStr + s(a.maxFileSize) + "</div>").appendTo(t.errorLog);
                        else if (-1 != a.maxFileCount && t.selectedFiles >= a.maxFileCount) a.showError && e("<div class='" + a.errorClass + "'><b>" + r[o].name + "</b> " + a.maxFileCountErrorStr + a.maxFileCount + "</div>").appendTo(t.errorLog);
            else {
                t.selectedFiles++, t.existingFileNames.push(r[o].name);
                var l = e.extend({}, a),
                    u = new FormData,
                    p = a.fileName.replace("[]", "");
                u.append(p, r[o]);
                var c = a.formData;
                if (c)
                    for (var h = i(c), f = 0; f < h.length; f++) h[f] && u.append(h[f][0], h[f][1]);
                l.fileData = u;
                var w = new m(t, a),
                    g = "";
                g = a.showFileCounter ? t.fileCounter + a.fileCounterStyle + r[o].name : r[o].name, a.showFileSize && (g += " (" + s(r[o].size) + ")"), w.filename.html(g);
                var C = e("<form style='display:block; position:absolute;left: 150px;' class='" + t.formGroup + "' method='" + a.method + "' action='" + a.url + "' enctype='" + a.enctype + "'></form>");
                C.appendTo("body");
                var b = [];
                b.push(r[o].name), v(C, l, w, b, t, r[o]), t.fileCounter++
            } else a.showError && e("<div class='" + a.errorClass + "'><b>" + r[o].name + "</b> " + a.duplicateErrorStr + "</div>").appendTo(t.errorLog);
            else a.showError && e("<div class='" + a.errorClass + "'><b>" + r[o].name + "</b> " + a.extErrorStr + a.allowedTypes + "</div>").appendTo(t.errorLog)
        }

        function n(e, a, t) {
            var r = a.allowedTypes.toLowerCase().split(/[\s,]+/g),
                o = t.split(".").pop().toLowerCase();
            return !("*" != a.allowedTypes && jQuery.inArray(o, r) < 0)
        }

        function d(e, a) {
            var t = !1;
            if (e.existingFileNames.length)
                for (var r = 0; r < e.existingFileNames.length; r++)(e.existingFileNames[r] == a || w.duplicateStrict && e.existingFileNames[r].toLowerCase() == a.toLowerCase()) && (t = !0);
            return t
        }

        function u(e, a) {
            if (e.existingFileNames.length)
                for (var t = 0; t < a.length; t++) {
                    var r = e.existingFileNames.indexOf(a[t]); - 1 != r && e.existingFileNames.splice(r, 1)
                }
        }

        function p(e, a) {
            if (e) {
                a.show();
                var t = new FileReader;
                t.onload = function(e) {
                    a.attr("src", e.target.result)
                }, t.readAsDataURL(e)
            }
        }

        function c(a, t) {
            if (a.showFileCounter) {
                var r = e(t.container).find(".ajax-file-upload-filename").length;
                t.fileCounter = r + 1, e(t.container).find(".ajax-file-upload-filename").each(function(t, o) {
                    var s = e(this).html().split(a.fileCounterStyle),
                        i = (parseInt(s[0]), r + a.fileCounterStyle + s[1]);
                    e(this).html(i), r--
                })
            }
        }

        function h(t, r, o, s) {
            var i = "ajax-upload-id-" + (new Date).getTime(),
                d = e("<form method='" + o.method + "' action='" + o.url + "' enctype='" + o.enctype + "'></form>"),
                u = "<input type='file' id='" + i + "' name='" + o.fileName + "' accept='" + o.acceptFiles + "'/>";
            o.multiple && (o.fileName.indexOf("[]") != o.fileName.length - 2 && (o.fileName += "[]"), u = "<input type='file' id='" + i + "' name='" + o.fileName + "' accept='" + o.acceptFiles + "' multiple/>");
            var p = e(u).appendTo(d);
            p.change(function() {
                t.errorLog.html("");
                o.allowedTypes.toLowerCase().split(",");
                var i = [];
                if (this.files) {
                    for (g = 0; g < this.files.length; g++) i.push(this.files[g].name);
                    if (0 == o.onSelect(this.files)) return
                } else {
                    var u = e(this).val(),
                        p = [];
                    if (i.push(u), !n(t, o, u)) return void(o.showError && e("<div class='" + o.errorClass + "'><b>" + u + "</b> " + o.extErrorStr + o.allowedTypes + "</div>").appendTo(t.errorLog));
                    if (p.push({
                            name: u,
                            size: "NA"
                        }), 0 == o.onSelect(p)) return
                }
                if (c(o, t), s.unbind("click"), d.hide(), h(t, r, o, s), d.addClass(r), o.serialize && a.fileapi && a.formdata) {
                    d.removeClass(r);
                    var f = this.files;
                    d.remove(), l(o, t, f)
                } else {
                    for (var w = "", g = 0; g < i.length; g++) o.showFileCounter ? w += t.fileCounter + o.fileCounterStyle + i[g] + "<br>" : w += i[g] + "<br>", t.fileCounter++;
                    if (-1 != o.maxFileCount && t.selectedFiles + i.length > o.maxFileCount) return void(o.showError && e("<div class='" + o.errorClass + "'><b>" + w + "</b> " + o.maxFileCountErrorStr + o.maxFileCount + "</div>").appendTo(t.errorLog));
                    t.selectedFiles += i.length;
                    var C = new m(t, o);
                    C.filename.html(w), v(d, o, C, i, t, null)
                }
            }), o.nestedForms ? (d.css({
                margin: 0,
                padding: 0
            }), s.css({
                position: "relative",
                overflow: "hidden",
                cursor: "default"
            }), p.css({
                position: "absolute",
                cursor: "pointer",
                top: "0px",
                width: "100%",
                height: "100%",
                left: "0px",
                "z-index": "100",
                opacity: "0.0",
                filter: "alpha(opacity=0)",
                "-ms-filter": "alpha(opacity=0)",
                "-khtml-opacity": "0.0",
                "-moz-opacity": "0.0"
            }), d.appendTo(s)) : (d.appendTo(e("body")), d.css({
                margin: 0,
                padding: 0,
                display: "block",
                position: "absolute",
                left: "-250px"
            }), -1 != navigator.appVersion.indexOf("MSIE ") ? s.attr("for", i) : s.click(function() {
                p.click()
            }))
        }

        function f(a, t) {
            return this.statusbar = e("<div class='ajax-file-upload-statusbar'></div>").width(t.statusBarWidth), this.preview = e("<img class='ajax-file-upload-preview' />").width(t.previewWidth).height(t.previewHeight).appendTo(this.statusbar).hide(), this.filename = e("<div class='ajax-file-upload-filename'></div>").appendTo(this.statusbar), this.progressDiv = e("<div class='ajax-file-upload-progress'>").appendTo(this.statusbar).hide(), this.progressbar = e("<div class='ajax-file-upload-bar'></div>").appendTo(this.progressDiv), this.abort = e("<div>" + t.abortStr + "</div>").appendTo(this.statusbar).hide(), this.cancel = e("<div>" + t.cancelStr + "</div>").appendTo(this.statusbar).hide(), this.done = e("<div>" + t.doneStr + "</div>").appendTo(this.statusbar).hide(), this.download = e("<div>" + t.downloadStr + "</div>").appendTo(this.statusbar).hide(), this.del = e("<div>" + t.deleteStr + "</div>").appendTo(this.statusbar).hide(), this.abort.addClass("ajax-file-upload-red"), this.done.addClass("ajax-file-upload-green"), this.download.addClass("ajax-file-upload-green"), this.cancel.addClass("ajax-file-upload-red"), this.del.addClass("ajax-file-upload-red"), this
        }

        function m(a, t) {
            var r = null;
            return (r = t.customProgressBar ? new t.customProgressBar(a, t) : new f(a, t)).abort.addClass(a.formGroup), r.abort.addClass(t.abortButtonClass), r.cancel.addClass(a.formGroup), r.cancel.addClass(t.cancelButtonClass), t.extraHTML && (r.extraHTML = e("<div class='extrahtml'>" + t.extraHTML() + "</div>").insertAfter(r.filename)), "bottom" == t.uploadQueueOrder ? e(a.container).append(r.statusbar) : e(a.container).prepend(r.statusbar), r
        }

        function v(t, o, s, l, n, d) {
            var h = {
                cache: !1,
                contentType: !1,
                processData: !1,
                forceSync: !1,
                type: o.method,
                data: o.formData,
                formData: o.fileData,
                dataType: o.returnType,
                headers: o.headers,
                beforeSubmit: function(a, r, d) {

                    if (0 != o.onSubmit.call(this, l)) {
                        if (o.dynamicFormData) {
                            var p = i(o.dynamicFormData());
                            if (p)
                                for (var h = 0; h < p.length; h++) p[h] && (o.serialize && void 0 != o.fileData ? d.formData.append(p[h][0], p[h][1]) : d.data[p[h][0]] = p[h][1])
                        }
                        return o.extraHTML && e(s.extraHTML).find("input,select,textarea").each(function(a, t) {
                            o.serialize && void 0 != o.fileData ? d.formData.append(e(this).attr("name"), e(this).val()) : d.data[e(this).attr("name")] = e(this).val()
                        }), !0
                    }
                    return s.statusbar.append("<div class='" + o.errorClass + "'>" + o.uploadErrorStr + "</div>"), s.cancel.show(), t.remove(), s.cancel.click(function() {
                        x.splice(x.indexOf(t), 1), u(n, l), s.statusbar.remove(), o.onCancel.call(n, l, s), n.selectedFiles -= l.length, c(o, n)
                    }), !1
                },
                beforeSend: function(e, t) {
                    for (var r in t.headers) e.setRequestHeader(r, t.headers[r]);
                    s.progressDiv.show(), s.cancel.hide(), s.done.hide(), o.showAbort && (s.abort.show(), s.abort.click(function() {
                        u(n, l), e.abort(), n.selectedFiles -= l.length, o.onAbort.call(n, l, s)
                    })), a.formdata ? s.progressbar.width("1%") : s.progressbar.width("5%")
                },
                uploadProgress: function(e, a, t, r) {
                    r > 98 && (r = 98);
                    var i = r + "%";
                    r > 1 && s.progressbar.width(i), o.showProgress && (s.progressbar.html(i), s.progressbar.css("text-align", "center"))
                },
                success: function(a, r, i) {
                    if (s.cancel.remove(), F.pop(), "json" == o.returnType && "object" == e.type(a) && a.hasOwnProperty(o.customErrorKeyStr)) {
                        s.abort.hide();
                        var d = a[o.customErrorKeyStr];
                        return o.onError.call(this, l, 200, d, s), o.showStatusAfterError ? (s.progressDiv.hide(), s.statusbar.append("<span class='" + o.errorClass + "'>ERROR: " + d + "</span>")) : (s.statusbar.hide(), s.statusbar.remove()), n.selectedFiles -= l.length, void t.remove()
                    }
                    n.responses.push(a), s.progressbar.width("100%"), o.showProgress && (s.progressbar.html("100%"), s.progressbar.css("text-align", "center")), s.abort.hide(), o.onSuccess.call(this, l, a, i, s), o.showStatusAfterSuccess ? (o.showDone ? (s.done.show(), s.done.click(function() {
                        s.statusbar.hide("slow"), s.statusbar.remove()
                    })) : s.done.hide(), o.showDelete ? (s.del.show(), s.del.click(function() {
                        u(n, l), s.statusbar.hide().remove(), o.deleteCallback && o.deleteCallback.call(this, a, s), n.selectedFiles -= l.length, c(o, n)
                    })) : s.del.hide()) : (s.statusbar.hide("slow"), s.statusbar.remove()), o.showDownload && (s.download.show(), s.download.click(function() {
                        o.downloadCallback && o.downloadCallback(a, s)
                    })), t.remove()
                },
                error: function(e, a, r) {
                    s.cancel.remove(), F.pop(), s.abort.hide(), "abort" == e.statusText ? (s.statusbar.hide("slow").remove(), c(o, n)) : (o.onError.call(this, l, a, r, s), o.showStatusAfterError ? (s.progressDiv.hide(), s.statusbar.append("<span class='" + o.errorClass + "'>ERROR: " + r + "</span>")) : (s.statusbar.hide(), s.statusbar.remove()), n.selectedFiles -= l.length), t.remove()
                }
            };
            o.showPreview && null != d && "image" == d.type.toLowerCase().split("/").shift() && p(d, s.preview), o.autoSubmit ? (t.ajaxForm(h), x.push(t), r()) : (o.showCancel && (s.cancel.show(), s.cancel.click(function() {
                x.splice(x.indexOf(t), 1), u(n, l), t.remove(), s.statusbar.remove(), o.onCancel.call(n, l, s), n.selectedFiles -= l.length, c(o, n)
            })), t.ajaxForm(h))
        }
        var w = e.extend({
            url: "",
            method: "POST",
            enctype: "multipart/form-data",
            returnType: null,
            allowDuplicates: !0,
            duplicateStrict: !1,
            allowedTypes: "*",
            acceptFiles: "*",
            fileName: "file",
            formData: !1,
            dynamicFormData: !1,
            maxFileSize: -1,
            maxFileCount: -1,
            multiple: !0,
            dragDrop: !0,
            autoSubmit: !0,
            showCancel: !0,
            showAbort: !0,
            showDone: !1,
            showDelete: !1,
            showError: !0,
            showStatusAfterSuccess: !0,
            showStatusAfterError: !0,
            showFileCounter: !0,
            fileCounterStyle: "). ",
            showFileSize: !0,
            showProgress: !1,
            nestedForms: !0,
            showDownload: !1,
            onLoad: function(e) {},
            onSelect: function(e) {
                return !0
            },
            onSubmit: function(e, a) {},
            onSuccess: function(e, a, t, r) {},
            onError: function(e, a, t, r) {},
            onCancel: function(e, a) {},
            onAbort: function(e, a) {},
            downloadCallback: !1,
            deleteCallback: !1,
            afterUploadAll: !1,
            serialize: !0,
            sequential: !1,
            sequentialCount: 2,
            customProgressBar: !1,
            abortButtonClass: "ajax-file-upload-abort",
            cancelButtonClass: "ajax-file-upload-cancel",
            dragDropContainerClass: "ajax-upload-dragdrop",
            dragDropHoverClass: "state-hover",
            errorClass: "ajax-file-upload-error",
            uploadButtonClass: "btn btn-info",
            dragDropStr: "<span><b>Drag &amp; Drop Files</b></span>",
            uploadStr: "Upload",
            abortStr: "Abort",
            cancelStr: "Cancel",
            deleteStr: "x",
            doneStr: "Done",
            multiDragErrorStr: "Multiple File Drag &amp; Drop is not allowed.",
            extErrorStr: "is not allowed. Allowed extensions: ",
            duplicateErrorStr: "is not allowed. File already exists.",
            sizeErrorStr: "is not allowed. Allowed Max size: ",
            uploadErrorStr: "Upload is not allowed",
            maxFileCountErrorStr: " is not allowed. Maximum allowed files are:",
            downloadStr: "Download",
            customErrorKeyStr: "jquery-upload-file-error",
            showQueueDiv: !1,
            statusBarWidth: 400,
            dragdropWidth: 400,
            showPreview: !1,
            previewHeight: "auto",
            previewWidth: "100%",
            extraHTML: !1,
            uploadQueueOrder: "top",
            headers: {}
        }, t);
        this.fileCounter = 1, this.selectedFiles = 0;
        var g = "ajax-file-upload-" + (new Date).getTime();
        this.formGroup = g, this.errorLog = e("<div></div>"), this.responses = [], this.existingFileNames = [], a.formdata || (w.dragDrop = !1), a.formdata && 1 !== w.maxFileCount || (w.multiple = !1), e(this).html("");
        var C = this,
            b = e("<div>" + w.uploadStr + "</div>");
        e(b).addClass(w.uploadButtonClass),
            function a() {
                if (e.fn.ajaxForm) {
                    if (w.dragDrop) {
                        var t = e('<div class="' + w.dragDropContainerClass + '" style="vertical-align:top;"></div>').width(w.dragdropWidth);
                        e(C).append(t), e(t).append(b), e(t).append(e(w.dragDropStr)), o(C, w, t)
                    } else e(C).append(b);
                    e(C).append(C.errorLog), w.showQueueDiv ? C.container = e("#" + w.showQueueDiv) : C.container = e("<div class='ajax-file-upload-container'></div>").insertAfter(e(C)), w.onLoad.call(this, C), h(C, g, w, b)
                } else window.setTimeout(a, 10)
            }(), this.startUpload = function() {
                e("form").each(function(a, t) {
                    e(this).hasClass(C.formGroup) && x.push(e(this))
                }), x.length >= 1 && r()
            }, this.getFileCount = function() {
                return C.selectedFiles
            }, this.stopUpload = function() {
                e("." + w.abortButtonClass).each(function(a, t) {
                    e(this).hasClass(C.formGroup) && e(this).click()
                }), e("." + w.cancelButtonClass).each(function(a, t) {
                    e(this).hasClass(C.formGroup) && e(this).click()
                })
            }, this.cancelAll = function() {
                e("." + w.cancelButtonClass).each(function(a, t) {
                    e(this).hasClass(C.formGroup) && e(this).click()
                })
            }, this.update = function(a) {
                w = e.extend(w, a), a.hasOwnProperty("url") && e("form").each(function(t, r) {
                    e(this).attr("action", a.url)
                })
            }, this.enqueueFile = function(e) {
                e instanceof File && l(w, C, [e])
            }, this.reset = function(e) {
                C.fileCounter = 1, C.selectedFiles = 0, C.errorLog.html(""), 0 != e && C.container.html("")
            }, this.remove = function() {
                C.container.html(""), e(C).remove()
            }, this.createProgress = function(e, a, t) {
                var r = new m(this, w);
                r.progressDiv.show(), r.progressbar.width("100%");
                var o = "";
                return o = w.showFileCounter ? C.fileCounter + w.fileCounterStyle + e : e, w.showFileSize && (o += " (" + s(t) + ")"), r.filename.html(o), C.fileCounter++, C.selectedFiles++, w.showPreview && (r.preview.attr("src", a), r.preview.show()), w.showDownload && (r.download.show(), r.download.click(function() {
                    w.downloadCallback && w.downloadCallback.call(C, [e], r)
                })), w.showDelete && (r.del.show(), r.del.click(function() {
                    r.statusbar.hide().remove();
                    var a = [e];
                    w.deleteCallback && w.deleteCallback.call(this, a, r), C.selectedFiles -= 1, c(w, C)
                })), r
            }, this.getResponses = function() {
                return this.responses
            };
        var x = [],
            F = [],
            D = !1;
        return this
    }
}(jQuery);