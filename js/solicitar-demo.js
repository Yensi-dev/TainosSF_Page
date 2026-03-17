(function () {

  var form      = document.getElementById('df-form');
  var submitBtn = document.getElementById('df-submit-btn');
  var btnText   = document.getElementById('df-btn-text');
  var spinner   = document.getElementById('df-spinner');
  var success   = document.getElementById('df-success');

  function setError(fieldId, show) {
    var field = document.getElementById('field-' + fieldId);
    if (!field) return;
    var inp = field.querySelector('.df-input, .df-select, .df-textarea');
    if (show) { field.classList.add('has-error'); if (inp) inp.classList.add('df-error'); }
    else       { field.classList.remove('has-error'); if (inp) inp.classList.remove('df-error'); }
  }

  function hasProduct() {
    return ['p-clinica','p-ferret','p-pharma']
      .some(function(id) {
        var el = document.getElementById(id);
        return el && el.checked;
      });
  }

  function validate() {
    var nombre         = document.getElementById('df-nombre').value.trim();
    var empresa        = document.getElementById('df-empresa').value.trim();
    var email          = document.getElementById('df-email').value.trim();
    var cargo          = document.getElementById('df-cargo').value;
    var disponibilidad = document.getElementById('df-disponibilidad').value;
    var ok = true;

    setError('nombre',         !nombre);         if (!nombre)  ok = false;
    setError('empresa',        !empresa);        if (!empresa) ok = false;
    setError('email',          !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ok = false;
    setError('cargo',          !cargo);          if (!cargo)   ok = false;
    setError('disponibilidad', !disponibilidad); if (!disponibilidad) ok = false;

    var pErr = document.getElementById('producto-error');
    if (!hasProduct()) {
      pErr.style.display = 'block'; ok = false;
    } else {
      pErr.style.display = 'none';
    }
    return ok;
  }

  /* clear errors on interaction */
  ['df-nombre','df-empresa','df-email','df-cargo','df-disponibilidad'].forEach(function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input',  function() { setError(id.replace('df-',''), false); });
    el.addEventListener('change', function() { setError(id.replace('df-',''), false); });
  });

  ['p-clinica','p-ferret','p-pharma'].forEach(function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('change', function() {
      document.getElementById('producto-error').style.display = 'none';
    });
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!validate()) return;

    submitBtn.disabled = true;
    btnText.style.display = 'none';
    spinner.style.display = 'block';

    /* Build products string */
    var productos = ['p-clinica','p-ferret','p-pharma']
      .filter(function(id) {
        var el = document.getElementById(id);
        return el && el.checked;
      })
      .map(function(id) { return document.getElementById(id).value; })
      .join(', ');

    fetch('https://api.web3forms.com/submit', {
      method:  'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key:     '6ec77e25-9788-4af2-ad80-d3987dfe14dc',
        subject:        'Nueva solicitud de demo desde tainosf.com 🎬',
        from_name:      'Taino Software Factory',
        nombre:         document.getElementById('df-nombre').value.trim(),
        empresa:        document.getElementById('df-empresa').value.trim(),
        email:          document.getElementById('df-email').value.trim(),
        telefono:       document.getElementById('df-telefono').value.trim(),
        cargo:          document.getElementById('df-cargo').value,
        productos:      productos,
        disponibilidad: document.getElementById('df-disponibilidad').value,
        notas:          document.getElementById('df-notas').value.trim()
      })
    })
    .then(function(r) {
      submitBtn.disabled = false;
      btnText.style.display = '';
      spinner.style.display = 'none';
      if (r.ok) {
        form.style.display    = 'none';
        success.style.display = 'flex';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert('Hubo un problema al enviar. Por favor intenta de nuevo o escríbenos a ventas@tainosf.com');
      }
    })
    .catch(function() {
      submitBtn.disabled = false;
      btnText.style.display = '';
      spinner.style.display = 'none';
      alert('Error de conexión. Por favor intenta de nuevo o escríbenos a ventas@tainosf.com');
    });
  });

})();