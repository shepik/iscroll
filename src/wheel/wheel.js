
	_initWheel: function () {
		utils.addEvent(this.wrapper, 'mousewheel', this);
		utils.addEvent(this.wrapper, 'DOMMouseScroll', this);

		this.on('destroy', function () {
			utils.removeEvent(this.wrapper, 'mousewheel', this);
			utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
		});
	},

	_wheel: function (e) {
		if ( !this.enabled) return;
		
		var wheelDeltaX, wheelDeltaY,
			newX, newY,
			that = this;

		// Execute the scrollEnd event after 400ms the wheel stopped scrolling
		clearTimeout(this.wheelTimeout);
		this.wheelTimeout = setTimeout(function () {
			that._execEvent('scrollEnd');
		}, 400);

		if ( 'wheelDeltaX' in e ) {
			wheelDeltaX = e.wheelDeltaX / 120;
			wheelDeltaY = e.wheelDeltaY / 120;
		} else if ( 'wheelDelta' in e ) {
			wheelDeltaX = wheelDeltaY = e.wheelDelta / 120;
		} else if ( 'detail' in e ) {
			wheelDeltaX = wheelDeltaY = -e.detail / 3;
		} else {
			return;
		}

		wheelDeltaX *= 100 * this.options.invertWheelDirection;
		wheelDeltaY *= 100 * this.options.invertWheelDirection;

		if (this.options.wheelDisable == 'up' && wheelDeltaY>0) return;
		if (this.options.wheelDisable == 'down' && wheelDeltaY<0) return;

		if ( !this.hasVerticalScroll ) {
			wheelDeltaX = wheelDeltaY;
		}

		newX = this.x + (this.hasHorizontalScroll ? wheelDeltaX : 0);
		newY = this.y + (this.hasVerticalScroll ? wheelDeltaY : 0);

		if ( newX > 0 ) {
			newX = 0;
		} else if ( newX < this.maxScrollX ) {
			newX = this.maxScrollX;
		}

		if ( newY > 0 ) {
			newY = 0;
		} else if ( newY < this.maxScrollY ) {
			newY = this.maxScrollY;
		}
		
		if (newX==this.x && newY==this.y) return;
		
		e.preventDefault();

		this.scrollTo(newX, newY, 0);

// INSERT POINT: _wheel
	},
