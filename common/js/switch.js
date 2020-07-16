$(function() {
	// SP�̉摜�u��
	// �u���̑ΏۂƂ���class�����B
	var $elem = $('.js-image-switch');
	// �u���̑ΏۂƂ���src�����̖����̕�����B
	var sp = '_sp.';
	var pc = '_pc.';
	// �摜��؂�ւ���E�B���h�E�T�C�Y�B
	var replaceWidth = 769;
	
	function imageSwitch() {
		// �E�B���h�E�T�C�Y���擾����B
		var windowWidth = parseInt($(window).width());
		
		// �y�[�W���ɂ��邷�ׂĂ�`.js-image-switch`�ɓK�������B
		$elem.each(function() {
			var $this = $(this);
			// �E�B���h�E�T�C�Y��768px�ȏ�ł����_sp��_pc�ɒu������B
			if(windowWidth >= replaceWidth) {
				$this.attr('src', $this.attr('src').replace(sp, pc));
			
				// �E�B���h�E�T�C�Y��768px�����ł����_pc��_sp�ɒu������B
			} else {
				$this.attr('src', $this.attr('src').replace(pc, sp));
			}
		});
	}
	imageSwitch();
	
	// ���I�ȃ��T�C�Y�͑����0.2�b�o���Ă��珈�������s����B
	var resizeTimer;
	$(window).on('resize', function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			imageSwitch();
		}, 200);
	});
});
