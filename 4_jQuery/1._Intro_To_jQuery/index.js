$("#teleport-btn").click(() => {
        const left = $(".input-left").val();
        $(".input-left").val($(".input-right").val());
        $(".input-right").val(left);
});
