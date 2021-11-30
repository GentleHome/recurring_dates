function generate_recurrence() {
    var pattern = {};

    // gather pattern
    ['start', 'every', 'unit', 'end_condition', 'until', 'rfor', 'nth', 'occurrence_of'].each(function (k) {
        pattern[k] = $(k).value;
    });

    // gather selected days
    pattern.days = $$('input.week_days').collect(function (d) {
        if (d.checked) return d.value;
        return null;
    }).compact();

    try {
        var r = new Recurrence(pattern);
        var dates = r.generate((this.value == '') ? undefined : this.value);
    } catch (e) {
        $('output').value = e.message;
        return;
    }

    $('output').value = "long:\n" + r.describe() + "\n\n";

    // compact description. next version.
    // $('output').value += "short:\n" + r.describe(true) + "\n\n";

    $('output').value += dates.collect(function (d) {
        return d.toString('ddd MM/dd/yyyy');
    }).join("\n");
}

document.observe('dom:loaded', function () {
    $('end_condition').observe('change', function () {
        $$('#for_span, #until_span').invoke('hide');
        $(this.value + '_span').show();
    });

    $('unit').observe('change', function () {
        $$('#week_span, #month_span').invoke('hide');
        if (this.value == 'w') $('week_span').show();
        if (this.value == 'm') $('month_span').show();
    });

    $$('button').invoke('observe', 'click', generate_recurrence);
});