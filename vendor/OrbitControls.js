class OrbitControls {
  constructor(object, domElement = null) {
    this.object = object;
    this.domElement = domElement;
    this.enabled = true;
    this.enableDamping = true;
    this.dampingFactor = 0.16;
    this.enablePan = false;
    this.enableZoom = true;
    this.zoomSpeed = 1;
    this.rotateSpeed = 1;
    this.minDistance = 2;
    this.maxDistance = 30;
    this.target = new THREE.Vector3();
    this._spherical = new THREE.Spherical();
    this._desired = new THREE.Vector3();
    this._pointer = new THREE.Vector2();
    this._dragging = false;
    this._tmp = new THREE.Vector3();
    this._syncFromCamera();
    if (domElement) this.connect();
  }

  _syncFromCamera() {
    this._tmp.copy(this.object.position).sub(this.target);
    this._spherical.setFromVector3(this._tmp);
    this._spherical.phi = THREE.MathUtils.clamp(this._spherical.phi, 0.02, Math.PI - 0.02);
    this._spherical.radius = THREE.MathUtils.clamp(this._spherical.radius, this.minDistance, this.maxDistance);
  }

  connect() {
    this.domElement.addEventListener("pointerdown", this._onPointerDown);
    this.domElement.addEventListener("pointermove", this._onPointerMove);
    this.domElement.addEventListener("pointerup", this._onPointerUp);
    this.domElement.addEventListener("pointercancel", this._onPointerUp);
    this.domElement.addEventListener("wheel", this._onWheel, {passive:false});
    this.domElement.addEventListener("contextmenu", e => e.preventDefault());
    this.domElement.style.touchAction = "none";
  }

  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown);
    this.domElement.removeEventListener("pointermove", this._onPointerMove);
    this.domElement.removeEventListener("pointerup", this._onPointerUp);
    this.domElement.removeEventListener("pointercancel", this._onPointerUp);
    this.domElement.removeEventListener("wheel", this._onWheel);
  }

  _onPointerDown = event => {
    if (!this.enabled || event.button !== 0) return;
    this._dragging = true;
    this._pointer.set(event.clientX, event.clientY);
    this.domElement.setPointerCapture?.(event.pointerId);
  };

  _onPointerMove = event => {
    if (!this.enabled || !this._dragging) return;
    const dx = event.clientX - this._pointer.x;
    const dy = event.clientY - this._pointer.y;
    this._pointer.set(event.clientX, event.clientY);
    const rect = this.domElement.getBoundingClientRect();
    this._spherical.theta -= dx / Math.max(1, rect.width) * Math.PI * this.rotateSpeed;
    this._spherical.phi -= dy / Math.max(1, rect.height) * Math.PI * this.rotateSpeed;
    this._spherical.phi = THREE.MathUtils.clamp(this._spherical.phi, 0.02, Math.PI - 0.02);
  };

  _onPointerUp = event => {
    this._dragging = false;
    try { this.domElement.releasePointerCapture?.(event.pointerId); } catch (_) {}
  };

  _onWheel = event => {
    if (!this.enabled || !this.enableZoom) return;
    event.preventDefault();
    const scale = Math.exp(event.deltaY * 0.001 * this.zoomSpeed);
    this._spherical.radius = THREE.MathUtils.clamp(this._spherical.radius * scale, this.minDistance, this.maxDistance);
  };

  update() {
    if (!this.enabled) return false;
    this._tmp.setFromSpherical(this._spherical).add(this.target);
    if (this.enableDamping) {
      this.object.position.lerp(this._tmp, this.dampingFactor);
    } else {
      this.object.position.copy(this._tmp);
    }
    this.object.lookAt(this.target);
    return true;
  }
}
globalThis.OrbitControls = OrbitControls;
