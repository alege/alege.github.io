(function ($) {
    var amoConfig = {
        contactUrl: 'https://jeffit.ru/amocrm-api/contacts/set',
        leadUrl: 'https://jeffit.ru/amocrm-api/leads/set'
    };

    var serverPrices = [
        0, 35000, 70000, 105000, 140000, 175000, 210000, 245000, 280000, 315000, 350000, 377300, 403370, 428240, 451960,
        474560, 496070, 516530, 535980, 554440, 571950, 588540, 604230, 619060, 633060, 650000, 672620, 695000, 717130,
        739030, 760690, 782120, 803310, 824270, 845010, 865510, 885790, 905840, 925670, 945280, 964670, 983840, 1002800,
        1021540, 1040070, 1058390, 1076500, 1094410, 1112100, 1129600, 1150000, 1170300, 1190500, 1210610, 1230610,
        1250520, 1270330, 1290040, 1309650, 1329170, 1348590, 1367910, 1387140, 1406270, 1425300, 1444240, 1463090,
        1481840, 1500500, 1519070, 1537540, 1555910, 1574200, 1592390, 1610490, 1628500, 1646420, 1664250, 1681980,
        1699630, 1717180, 1734650, 1752030, 1769310, 1786510, 1803620, 1820650, 1837580, 1854430, 1871190, 1887860,
        1904440, 1920940, 1937360, 1953680, 1969930, 1986080, 2002160, 2018150, 2034050, 2050000, 2068950, 2087860,
        2106750, 2125610, 2144440, 2163240, 2182010, 2200750, 2219460, 2238140, 2256800, 2275420, 2294020, 2312580,
        2331120, 2349620, 2368100, 2386550, 2404970, 2423360, 2441720, 2460060, 2478360, 2496640, 2514880, 2533100,
        2551290, 2569450, 2587580, 2605690, 2623760, 2641810, 2659820, 2677810, 2695770, 2713700, 2731610, 2749480,
        2767330, 2785150, 2802940, 2820700, 2838430, 2856140, 2873820, 2891460, 2909090, 2926680, 2944240, 2961780,
        2979290, 2996770, 3014220, 3031650, 3049050, 3066420, 3083760, 3101070, 3118360, 3135620, 3152850, 3170050,
        3187230, 3204380, 3221500, 3238590, 3255660, 3272700, 3289710, 3306690, 3323650, 3340580, 3357480, 3374350,
        3391200, 3408020, 3424820, 3441580, 3458320, 3475030, 3491720, 3508380, 3525010, 3541610, 3558190, 3574740,
        3591260, 3607760, 3624230, 3640670, 3657090, 3673480, 3689840, 3706180, 3722490, 3738770, 3755030, 3771260,
        3787460, 3800000
    ];
    var cloudPrice = 1050;

    var $document = $(document);

    var LOCATION_SERVER = 'location_server';
    var LOCATION_CLOUD = 'location_cloud';

    var locationCtrl = {
        selected: '',
        $server: null,
        $cloud: null,
        init: function () {
            this.$server = $('.js-location-server');
            this.$cloud = $('.js-location-cloud');

            if (this.$server.hasClass('location_active')) {
                this.selected = LOCATION_SERVER;
            } else if (this.$cloud.hasClass('location_active')) {
                this.selected = LOCATION_CLOUD;
            }
            this.changeTrigger();

            this.$server.click($.proxy(function () {
                this.selected = LOCATION_SERVER;
                this.$server.addClass('location_active');
                this.$cloud.removeClass('location_active');
                this.changeTrigger();
            }, this));
            this.$cloud.click($.proxy(function () {
                this.selected = LOCATION_CLOUD;
                this.$cloud.addClass('location_active');
                this.$server.removeClass('location_active');
                this.changeTrigger();
            }, this));
        },

        changeTrigger: function () {
            $.event.trigger({
                type: 'location-change',
                location: this.selected
            });
        }
    };

    var TARIFF_DEP_SERVICES = 'tariff_dep_services';
    var TARIFF_COMPANY = 'tariff_company';

    var featuresCtrl = {
        selected: TARIFF_DEP_SERVICES,
        $depServices: null,
        $depServicesAbout: null,
        $aboutToggle: null,
        $companies: null,
        init: function () {
            this.$depServices = $('.js-services-features, .js-dep-services-radio');
            this.$companies = $('.js-companies, .js-companies-radio');
            this.$aboutToggle = $('.js-about-toggle');
            this.changeTrigger();

            this.$aboutToggle.click($.proxy(function (event) {
                var $feature = $(event.target).closest('.js-mobile-feature');
                var $about = $feature.find('.js-about');
                var $aboutToggle = $feature.find('.js-about-toggle');
                var newText = 'Свернуть';
                if ($about.is(':visible')) {
                    newText = 'Подробнее';
                }
                $about.toggle();
                $aboutToggle.text(newText);
            }, this));

            this.$depServices.click($.proxy(function () {
                this.selected = TARIFF_DEP_SERVICES;
                this.$depServices.addClass('active-feature');
                this.$companies.removeClass('active-feature');
                this.changeTrigger();
            }, this));
            this.$companies.click($.proxy(function () {
                this.selected = TARIFF_COMPANY;
                this.$companies.addClass('active-feature');
                this.$depServices.removeClass('active-feature');
                this.changeTrigger();
            }, this));
        },

        changeTrigger: function () {
            $.event.trigger({
                type: 'tariff-change',
                location: this.selected
            });
        }
    };

    var calculatorCtrl = {
        $users: null,
        $usersInput: null,
        $period: null,
        $periodInput: null,
        $periodPercents: null,

        $locationPlace: null,
        $tariffPlace: null,
        $usersPlace: null,
        $periodPlace: null,
        $periodBlock: null,

        $withoutDiscount: null,
        $withoutDiscountWrap: null,

        $addServicesButton: null,

        $trialModal: null,
        $domainSuffix: null,

        demoRequest: false,

        init: function () {
            this.elementsInit();
            this.createUsersSlider(LOCATION_SERVER);
            this.createPeriodSlider();

            this.$usersInput.on('keyup, change', $.proxy(function () {
                var value = this.$usersInput.val();
                var intValue = parseInt(value);
                if (intValue != value) {
                    intValue = 1;
                    this.$usersInput.val(intValue);
                }
                this.$users.slider('setValue', intValue);
                this.onPeriodChange();
            }, this));
            this.$periodInput.on('keyup, change', $.proxy(function () {
                var value = this.$periodInput.val();
                var intValue = parseInt(value);
                if (intValue != value) {
                    intValue = 1;
                    this.$periodInput.val(intValue);
                }
                this.$period.slider('setValue', intValue);
                this.onUsersCountChange();
            }, this));

            $document.on('location-change', $.proxy(this.onLocationChange, this));
            $document.on('tariff-change', $.proxy(this.onTariffChange, this));

            this.$trialModal.on('shown.bs.modal', $.proxy(function () {
                this.$domainSuffix.tooltip('show');
            }, this));
            this.$trialModal.on('shown.bs.hide', $.proxy(function () {
                this.$domainSuffix.tooltip('hide');
            }, this));

            this.onUsersCountChange();
            this.onPeriodChange();
        },

        elementsInit: function () {
            this.$trialModal = $('#trialAccess');
            this.$domainSuffix = $('.js-domain-tooltip');

            this.$usersInput = $('.js-user-count-input');
            this.$periodInput = $('.js-period-input');

            this.$locationPlace = $('.js-calculator-result_location');
            this.$tariffPlace = $('.js-calculator-result_tariff');
            this.$usersPlace = $('.js-calculator-result_users');
            this.$periodPlace = $('.js-calculator-result_period');
            this.$periodBlock = $('.js-period-block');

            this.$totalPrice = $('.js-total-price');
            this.$withoutDiscountWrap = $('.js-without-discount-wrap');
            this.$withoutDiscount = this.$withoutDiscountWrap.find('.js-without-discount');

            this.$users = $('.js-user-count-slider');
            this.$period = $('.js-period-slider');

            this.$periodPercents = $('.js-slider-percents');

            this.$addServicesButton = $('.js-additional-services');
        },

        getUsersCount: function () {
            return this.$users.slider('getValue');
        },

        getPeriod: function () {
            return this.$period.slider('getValue');
        },

        createUsersSlider: function (type) {
            var currentValue = parseInt(this.$usersInput.val());

            var settings = {
                tooltip: 'hide',
                labelledby: 'Количество пользователей',
                value: currentValue || 1
            };
            if (type === LOCATION_SERVER) {
                settings = $.extend(settings, {
                    ticks: [1, 10, 50, 100, 200],
                    ticks_positions: [0, 5, 25, 50, 100],
                    ticks_labels: ['', 10, 50, 100, 200]
                });
            } else {
                settings = $.extend(settings, {
                    ticks: [1, 10, 25, 50, 100],
                    ticks_positions: [0, 10, 25, 50, 100],
                    ticks_labels: ['', 10, 25, 50, 100]
                });
                if (currentValue > 100) {
                    settings.value = 100;
                    this.$usersInput.val(100);
                    this.$usersPlace.text('100 пользователей');
                }
            }
            this.$usersInput.attr('max', settings.ticks[settings.ticks.length - 1]);
            this.$users.slider(settings);

            this.$users.on('change', $.proxy(function (event) {
                this.$usersInput.val(event.value.newValue);
                this.onUsersCountChange();
            }, this));
        },

        createPeriodSlider: function () {
            this.$period.slider({
                tooltip: 'hide',
                ticks: [1, 6, 12],
                ticks_positions: [0, 50, 100],
                ticks_labels: [1, 6, 12],
                labelledby: 'Срок аренды',
                value: 1
            });
            $(this.$period.slider('getElement')).find('.slider-track').append(this.$periodPercents);
            this.$periodPercents.show();

            this.$period.on('change', $.proxy(function (event) {
                this.$periodInput.val(event.value.newValue);
                this.onPeriodChange();
            }, this));
        },

        numberWithCommas: function (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        },

        formatTotalPrice: function () {
            var userCount = this.getUsersCount();
            var price = this.getPriceByUsersCount(userCount);

            if (locationCtrl.selected === LOCATION_CLOUD) {
                price *= this.getPeriod();
            }

            var discount = this.calcDiscount();
            if (discount === 0) {
                this.$withoutDiscountWrap.hide();
            } else {
                this.$withoutDiscountWrap.show();
                this.$withoutDiscount.text(this.numberWithCommas(price));
            }
            var totalPrice = price - price * discount / 100;
            this.$totalPrice.text(this.numberWithCommas(totalPrice));
            return totalPrice;
        },

        getPriceByUsersCount: function (userCount) {
            if (locationCtrl.selected === LOCATION_SERVER) {
                return serverPrices[userCount];
            }
            if (locationCtrl.selected === LOCATION_CLOUD) {
                return cloudPrice * userCount;
            }
            return 0;
        },

        calcDiscount: function () {
            if (locationCtrl.selected === LOCATION_SERVER) {
                return 0;
            }
            var period = this.getPeriod();
            if (period < 6) {
                return 0;
            }
            if (period !== 12) {
                return 5;
            }
            return 10;
        },

        onLocationChange: function (event) {
            this.$users.slider('destroy');
            this.createUsersSlider(event.location);

            var message;
            if (event.location === LOCATION_SERVER) {
                message = 'на Вашем сервере';
                this.$addServicesButton.hide();
                this.$periodBlock.hide();
                this.$periodPlace.text('с бессрочной лицензией и одним годом бесплатных обновлений');
            } else {
                message = 'в облаке';
                this.$addServicesButton.show();
                this.$periodBlock.show();
                this.onPeriodChange();
            }
            this.$locationPlace.text(message);
            this.formatTotalPrice();
        },

        onTariffChange: function (event) {
            var message;
            if (event.location === TARIFF_DEP_SERVICES) {
                message = 'департаментов/служб';
            } else {
                message = 'компаний';
            }
            this.$tariffPlace.text(message);

            this.formatTotalPrice();
        },

        onUsersCountChange: function () {
            var message;
            var usersCount = this.getUsersCount();
            if (usersCount === 1) {
                message = '1 пользователя';
            } else {
                message = usersCount + ' пользователей';
            }
            this.$usersPlace.text(message);
            this.formatTotalPrice();
        },

        onPeriodChange: function () {
            var message;
            var period = this.getPeriod();
            if (period === 1) {
                message = 'с оплатой за месяц';
            } else {
                var month = ' месяцев';
                if (period < 5) {
                    month = ' месяца';
                }
                message = 'с оплатой за ' + period + month;
            }
            this.$periodPlace.text(message);
            this.formatTotalPrice();
        }
    };

    var buyFormCtrl = {
        $referrer: null,
        init: function () {
            this.elementsInit();

            if (this.$referrer.length) {
                this.$referrer.val(document.referrer);
            }
            $('.js-validable-field, .validableField')
                .blur($.proxy(this.onValidatableBlur, this))
                .keyup($.proxy(this.onValidatableKeyup, this));
        },

        elementsInit: function () {
            this.$referrer = $('#referrer');
            $('.js-buy-form, .js-trial-form, .feedback__form, .demoRequest__form, .onlineDemo__form, .liveDemo__form, .js-additional-services-form')
                .submit($.proxy(this.onSubmit, this));
        },

        formatBuyCommentary: function () {
            var lead = {
                licenses: calculatorCtrl.getUsersCount(),
                months: calculatorCtrl.getPeriod()
            };
            var commentary = 'Купить ';
            commentary += 'Расположение: ';
            if (locationCtrl.selected === LOCATION_SERVER) {
                commentary += 'на сервере';
                if (featuresCtrl.selected === TARIFF_DEP_SERVICES) {
                    lead.product = '4276016'; // Jeffit для юрслужб
                } else {
                    lead.product = '4276014'; // Jeffit для юрфирм
                }
            } else {
                commentary += 'в облаке';
                if (featuresCtrl.selected === TARIFF_DEP_SERVICES) {
                    lead.product = '4276020'; // Jeffit.Cloud для юрслужб
                } else {
                    lead.product = '4276018'; // Jeffit.Cloud для юрфирм
                }
            }
            commentary += '; ';

            commentary += 'Для: ';
            if (featuresCtrl.selected === TARIFF_DEP_SERVICES) {
                commentary += 'департаментов и служб';
            } else {
                commentary += 'компаний';
            }
            commentary += '; ';

            commentary += 'Кол-во пользователей: ' + lead.licenses + '; ';
            commentary += 'На срок: ' + lead.months + '; ';
            return lead;
        },

        validateForm: function (form) {
            var self = this;
            var valid = true;
            form.find('.js-validable-field, .validableField').each(function () {
                if (!self.validateField($(this))) {
                    valid = false;
                }
            });
            return valid;
        },

        validateField: function (field) {
            var wrapper = field.closest('.form-group');
            var str = field.val();
            var valid = !!str;

            if (field.attr('type') === 'email') {
                valid = this.validateEmail(field);
            }
            if (field.attr('name') === 'domain') {
                valid = this.validateDomain(field);
            }
            if (field.attr('type') === 'tel') {
                valid = this.validateTel(field);
            }
            if (valid) {
                wrapper.removeClass('has-error');
            } else {
                wrapper.addClass('has-error');
            }
            return valid;
        },

        validateEmail: function (field) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(field.val());
        },

        validateDomain: function (field) {
            var re = /^[a-z0-9-]{2,}$/;
            return re.test(field.val());
        },

        validateTel: function (field) {
            var re = /^[\d\+\-]{2,}$/;
            return re.test(field.val());
        },

        onValidatableBlur: function (event) {
            var $field = $(event.target);
            if ($field.hasClass('enter-pressed')) {
                $field.removeClass('enter-pressed');
                return;
            }
            $field.addClass('blurred');
            this.validateField($field);
        },

        onValidatableKeyup: function (event) {
            var $field = $(event.target);
            if (event.keyCode == 13) {
                $field.addClass('enter-pressed');
            }
            if ($field.hasClass('blurred') || $field.closest('.has-error').length) {
                if (!this.validateField($field) && $field.hasClass('enter-pressed')) {
                    $field.removeClass('enter-pressed');
                }
            }
        },

        onSubmit: function (e) {
            e.preventDefault();

            var form = $(e.target);
            var submitButton = form.find('[type="submit"]');
            var data = form.data() || {};
            var current = data.current;
            var next = data.next;
            var extra = {};
            submitButton.prop('disabled', true);

            if (this.validateForm(form)) {
                if (form.data('type') === 'buy') {
                    extra.lead = this.formatBuyCommentary();
                    extra.lead.name = 'Покупка лицензии';
                    extra.lead.price = calculatorCtrl.formatTotalPrice();
                    // form.find('[name="msg"]').val(this.formatBuyCommentary());
                } else if (form.data('type') === 'contact') {
                    form.find('[name="msg"]').val(form.find('[name="comment"]').val());
                }
                if (form.hasClass('js-additional-services-form')) {
                    var space = 'Дополнительное пространство: ' + form.find('[name="space"]').val();
                    form.find('[name="msg"]').val(space);
                }
                if (form.hasClass('js-trial-form')) {
                    var domain = form.find('[name="domain"]').val();
                    extra.lead = extra.lead || {};
                    extra.lead.name = 'Попробовать бесплатно';
                    extra.lead.trial = true;
                    extra.lead.address = domain + '.jeffit.ru';
                    // form.find('[name="msg"]').val('Компания(название домена): ' + domain);
                }
                this.demoRequest = form.hasClass('demoRequest__form') || form.hasClass('onlineDemo__form');
                var cb = (!current || !next) ? null : function () {
                    $('#' + current).modal('hide');
                    $('#' + next).modal('show');
                };
                this.submitToCrm({
                    form: form,
                    cb: cb,
                    extra: extra
                });
            } else {
                submitButton.prop('disabled', false);
            }
        },

        submitToCrm: function (params) {
            params = params || {};
            var form = params.form;
            var cb = params.cb;
            var extra = params.extra || {};
            var self = this;
            extra.contact = extra.contact || {};
            extra.contact.ref = self.$referrer.val();
            if (form.find('[name="email"]').val()) {
                extra.contact.email = form.find('[name="email"]').val();
            }
            if (form.find('[name="phone"]').val()) {
                extra.contact.phone = form.find('[name="phone"]').val();
            }
            if (form.find('[name="msg"]').val()) {
                extra.contact.message = form.find('[name="msg"]').val();
            }
            if (form.find('[name="formName"]').val()) {
                extra.contact.lead = form.find('[name="formName"]').val();
            }
            if (form.find('[name="name"]').val()) {
                extra.contact.name = form.find('[name="name"]').val();
            } else {
                extra.contact.name = extra.contact.email || extra.contact.phone;
            }
            var hasLead = !!extra.lead;
            var url = hasLead && amoConfig.leadUrl || amoConfig.contactUrl;
            var postData = hasLead && extra || extra.contact;
            $.ajax({
                type: 'POST',
                url: url,
                data: JSON.stringify(postData),
                dataType: 'json',
                contentType: 'application/json'
            });
            if (cb) {
                cb();
                return;
            }
            setTimeout(function () {
                self.submitToCrmCallback({
                    success: true,
                    form: form
                });
            }, 1000);
        },

        submitToCrmCallback: function (params) {
            params = params || {};
            params.success = true;

            var alertMsg = params.success ? 'Спасибо! Данные успешно отправлены.' : 'Что-то пошло не так. Попробуйте ещё раз.';
            var formNameField = params.form.find('[name="formName"]');
            var formName = formNameField.length ? formNameField.val() : '';

            if (params.success) {
                if (params.form.hasClass('liveDemo__form')) {
                    alertMsg = 'Спасибо за заявку. Мы свяжемся с вами в ближайшее время для уточнения необходимых деталей и планирования встречи.';
                } else if (params.form.hasClass('demoRequest__form')) {
                    alertMsg = 'Спасибо за интерес к JEFFIT. Сейчас вам будет предоставлен доступ к демо-системе.';
                } else if (params.form.hasClass('feedback__form') && formName == 'Подписка на рассылку об обновлениях') {
                    alertMsg = 'Спасибо за интерес к Jeffit. Мы добавили вас в список рассылки новостей.';
                } else if (params.form.hasClass('js-trial-form')) {
                    alertMsg = 'Спасибо за заявку. Мы подготовим демо-систему и пригласим вас по указанному E-mail';
                } else if (params.form.hasClass('js-buy-form')) {
                    if (formName == 'Обратная связь') {
                        alertMsg = 'Спасибо, что написали нам! Мы рассмотрим ваш комментарий и свяжемся с вами';
                    } else {
                        alertMsg = 'Спасибо за заявку. Мы свяжемся с вами в ближайшее время для уточнения необходимых деталей и подготовки счета.';
                    }
                }
            }

            var modal = params.form.closest('.modal');
            var alertModal = $('#alertModal');
            var fields = params.form.find('input, textarea');
            var shouldRedirectToDemo = false;

            params.form.find('[type="submit"]').prop('disabled', false);

            if (!localStorage.getItem('demoAccess') && params.success) {
                localStorage.setItem('demoAccess', params.success);
            }

            if (params.success) {
                if (this.demoRequest) {
                    shouldRedirectToDemo = true;
                    alertMsg = 'Спасибо за интерес к Jeffit. Вы получили доступ к демо-системе и сейчас будете перенаправлены на страницу выбора версии системы.';
                }
                fields.removeClass('blurred');
                fields.filter(':not([type="hidden"])').val('');
                params.form.find('.form-group').removeClass('has-error');
            }

            if (modal) {
                modal.modal('hide');
            }

            alertModal.modal('show');

            var alertStateClass = params.success ? 'alert-info c-bg-green' : 'alert-danger';
            alertModal.find('.alert').removeClass('alert-info c-bg-green alert-danger');
            alertModal.find('.alert').addClass(alertStateClass).html(alertMsg);
            checkDemoAccess();

            setTimeout(function () {
                alertModal.modal('hide');
                if (shouldRedirectToDemo) {
                    window.location.href = window.location.origin + '/demo.html';
                } else if (!params.success) {
                    modal.modal('show');
                }
            }, 4000);
        }
    };

    checkDemoAccess();
    $document.ready(function () {
        calculatorCtrl.init();
        locationCtrl.init();
        featuresCtrl.init();
        buyFormCtrl.init();
    });

    function checkDemoAccess() {
        if (localStorage.getItem('demoAccess')) {
            $('.demoAccess').attr('href', 'demo.html');
        } else {
            $('.demoAccess').attr('href', './index.html#trySuggest');
            if (window.location.href.search('demo.html') != -1) {
                window.location.href = window.location.origin;
            }
        }
    }

    $('.calculator__slider-input-wrap input').change(function () {
        if (+$(this).val() > $(this).attr('max')) {
            $(this).attr('value', $(this).attr('max'));
        }
    });

})(jQuery);

$(document).ready(function () {
    var container = $('#blogPostsContainer');
    if (!container.length) {
        return;
    }
    var content = $('#blogPostsContent');
    $.ajax({
        url: 'https://jeffit.ru/blog/feed/json',
        dataType: 'jsonp',
        error: function (jsxhr, status, error) {
            container.hide();
        },
        success: function (response) {
            render(response);
            console.log(response);
        }
    });

    function compile(item) {
        var excerpt = item.excerpt.split(' ').slice(0, 20).join(' ');
        var thumbData = item.thumbnail && item.thumbnail.split(', ')[2].split(' ') || null;
        var thumbSrc = thumbData && thumbData[0] || '';

        return '<div class="item">' +
            '<div class="c-content-blog-post-card-1 c-option-2">' +
                '<div class="c-media c-content-overlay" style="max-height: 300px; background: url(' + thumbSrc + ') 50% 50%; background-size: cover;">' +
                    '<a href="' + item.permalink + '" style="display: block; text-decoration: none; padding-bottom: 100%;"></a>' +
                '</div>' +
                '<div class="c-body" style="min-height: 350px;">' +
                    '<div class="c-title c-font-uppercase c-font-bold">' +
                        '<a href="' + item.permalink + '">' + item.title + '</a>' +
                    '</div>' +
                    '<div class="c-author">' +
                        '<span class="c-font-uppercase">' + item.author + '</span> ' +
                        '&nbsp;&nbsp;<span class="c-font-uppercase">' + item.date + '</span>' +
                    '</div>' +
                    // '<div class="c-panel">' +
                        // '<ul class="c-tags c-theme-ul-bg">' +
                        //     '<li>ux</li>' +
                        //     '<li>web</li>' +
                        //     '<li>events</li>' +
                        // '</ul>' +
                        // '<div class="c-comments">' +
                        //     '<a href="#"><i class="icon-speech"></i> 30 comments</a>' +
                        // '</div>' +
                    // '</div>' +
                    '<p>' + excerpt + '…</p>' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    function render(data) {
        if (!data || !data.length) {
            container.hide();
            return;
        }
        data.splice(10);
        content.html('');

        for (var i = 0; i < data.length; i++) {
            content.append(compile(data[i]));
        }

        var columns = data.length > 3 ? 3 : data.length;
        var owl = $('#blogPostsContent');
        owl.owlCarousel({
            items: columns
        });

        handleHeight();
    }

    function handleHeight() {
        $('[data-auto-height]').each(function () {
            var parent = $(this);
            var items = $('[data-height]', parent);
            var height = 0;
            var mode = parent.attr('data-mode');
            var offset = parseInt(parent.attr('data-offset') ? parent.attr('data-offset') : 0);

            items.each(function () {
                if ($(this).attr('data-height') == 'height') {
                    $(this).css('height', '');
                } else {
                    $(this).css('min-height', '');
                }

                var height_ = (mode == 'base-height' ? $(this).outerHeight() : $(this).outerHeight(true));
                if (height_ > height) {
                    height = height_;
                }
            });

            height = height + offset;

            items.each(function () {
                if ($(this).attr('data-height') == 'height') {
                    $(this).css('height', height);
                } else {
                    $(this).css('min-height', height);
                }
            });

            if (parent.attr('data-related')) {
                $(parent.attr('data-related')).css('height', parent.height());
            }
        });
    }
});



$(document).ready(function () {
    $('.tabs-insource-outsource').bind('click', function (e) {
        $('.tabs-insource-outsource').removeClass('tabs-insource-outsource-large');
    });
});

/*$(document).ready(function () {
    $('#choiceDemoModal').modal('show');
});

function choiceDemoInsource() {
    $('.nav-tabs a[href="#tab_insource"]').tab('show');
    $('#choiceDemoModal').modal('hide');
}

function choiceDemoOutsource() {
    $('.nav-tabs a[href="#tab_outsource"]').tab('show');
    $('#choiceDemoModal').modal('hide');
}*/

$('.screenchanger__navigation li').click(function () {
    var ind = $(this).index();
    $(this).parents('.screenchanger').find('.screenchanger__screens img:eq(' + ind + ')').addClass('active').siblings().removeClass('active');
});

$(document).ready(function () {
    var removeVisibleNav = function (e) {
        $('.c-mega-menu').removeClass('c-shown');
        $('.c-layout-header').removeClass('c-mega-menu-shown');
    };
    $(window).on('scroll', removeVisibleNav);
    $('body').on('click', function (e) {
        var target = $(e.target);
        if (!target.hasClass('c-hor-nav-toggler') && !target.hasClass('c-mega-menu') && !target.hasClass('c-line')) {
            removeVisibleNav();
        }
    });

    $('.scrollLink[href^="#"]').on('click', function (e) {
        var target = this.hash;
        e.preventDefault();
        return $('html, body').animate({
            scrollTop: $(this.hash).offset().top - 70
        }, 500, function () {
            return window.history.pushState(null, null, target);
        });
    });
});




$(document).ready(function () {
    var owl = $('#reviewsContent');
    owl.owlCarousel({
        stagePadding: 50,
        navigation: true,
        loop: true,
        singleItem: true,
        items: 1,
        autoHeight: true,
        margin: 20
    });
});


$(document).ready(function () {
    $('.trysuggest__contrast').mouseenter(function () {
        $('.trysuggest__contrast-block').fadeIn();
    });
    $('.trysuggest__contrast-block').mouseleave(function () {
        $(this).fadeOut();
    });
});
