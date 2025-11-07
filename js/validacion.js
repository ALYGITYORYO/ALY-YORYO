const form = document.getElementById('registroForm');
        const nombre = document.getElementById('nombre');
        const edad = document.getElementById('edad');
        const email = document.getElementById('email');
        const curp = document.getElementById('curp');
        const estudios = document.getElementById('estudios');
        const telefono = document.getElementById('telefono');
        const successMessage = document.getElementById('successMessage');

        // Validación en tiempo real
        nombre.addEventListener('blur', validarNombre);
        edad.addEventListener('blur', validarEdad);
        email.addEventListener('blur', validarEmail);
        curp.addEventListener('blur', validarCurp);
        estudios.addEventListener('change', validarEstudios);
        telefono.addEventListener('blur', validarTelefono);

        // Validar nombre
        function validarNombre() {
            const valor = nombre.value.trim();
            const error = document.getElementById('nombreError');
            const warning = document.getElementById('nombre');
            
            if (valor.length < 3) {
                mostrarError(nombre, error, 'El nombre debe tener al menos 3 caracteres');
                warning.classList.add('warning','invalid');
                return false;
            }
            
            ocultarError(nombre, error);
            return true;
        }

        // Validar edad
        function validarEdad() {
            const valor = parseInt(edad.value);
            const error = document.getElementById('edadError');
            const warning = document.getElementById('edad');
            if (isNaN(valor) || valor < 1 || valor > 120) {
                mostrarError(edad, error, 'La edad debe estar entre 1 y 120 años');
                 warning.classList.add('warning','invalid');
                return false;
            }
            
            ocultarError(edad, error);
            return true;
        }

        // Validar sexo
        function validarSexo() {
            const sexoSeleccionado = document.querySelector('input[name="sexo"]:checked');
            const error = document.getElementById('sexoError');
            
            if (!sexoSeleccionado) {
                error.classList.add('show');
                return false;
            }
            
            error.classList.remove('show');
            return true;
        }

        // Validar intereses
        function validarIntereses() {
            const checkboxes = document.querySelectorAll('input[name="intereses"]:checked');
            const error = document.getElementById('interesesError');
            
            if (checkboxes.length === 0) {
                error.classList.add('show');
                return false;
            }
            
            error.classList.remove('show');
            return true;
        }

        // Validar email
        function validarEmail() {
            const valor = email.value.trim();
            const error = document.getElementById('emailError');
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const warning = document.getElementById('email');
            if (!regex.test(valor)) {
                mostrarError(email, error, 'Ingresa un correo electrónico válido');
                 warning.classList.add('warning','invalid');
                return false;
            }
            
            ocultarError(email, error);
            return true;
        }

        
        // Validar curp
        function validarCurp() {
            const valor = curp.value.trim();
            const error = document.getElementById('curpError');
            const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]\d$/;
            const warning = document.getElementById('curp');
            if (!curpRegex.test(valor)) {
                mostrarError(curp, error, 'Ingresa corectamente tu Curp');
                 warning.classList.add('warning','invalid');
                return false;
            }
            
            ocultarError(curp, error);
            return true;
        }

        // Validar estudios
        function validarEstudios() {
            const valor = estudios.value;
            const error = document.getElementById('estudiosError');
            
            if (valor === '') {
                mostrarError(estudios, error, 'Selecciona tu nivel de estudios');
                return false;
            }
            
            ocultarError(estudios, error);
            return true;
        }

        // Validar teléfono
        function validarTelefono() {
            const valor = telefono.value.trim();
            const error = document.getElementById('telefonoError');
            const regex = /^\d{10}$/;
            const warning = document.getElementById('telefono');
            if (!regex.test(valor)) {
                mostrarError(telefono, error, 'Ingresa un teléfono válido de 10 dígitos');
                 warning.classList.add('warning','invalid');
                return false;
            }
            
            ocultarError(telefono, error);
            return true;
        }

        // Mostrar error
        function mostrarError(input, errorElement, mensaje) {
            input.classList.add('invalid');
            input.classList.remove('valid');
            errorElement.textContent = mensaje;
            errorElement.classList.add('show');
        }

        // Ocultar error
        function ocultarError(input, errorElement) {
            input.classList.remove('invalid');
            input.classList.add('valid');
            errorElement.classList.remove('show');
        }

        // Validar formulario completo
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombreValido = validarNombre();
            const edadValida = validarEdad();
            const sexoValido = validarSexo();
            const interesesValidos = validarIntereses();
            const emailValido = validarEmail();
            const curpValido = validarCurp();
            const estudiosValidos = validarEstudios();
            const telefonoValido = validarTelefono();
            
            if (nombreValido && edadValida && sexoValido && interesesValidos && 
                emailValido && estudiosValidos && telefonoValido && curpValido) {
                
                // Obtener datos del formulario
                const formData = new FormData(form);
                const intereses = Array.from(document.querySelectorAll('input[name="intereses"]:checked'))
                    .map(cb => cb.value);
                
                console.log('Datos del formulario:');
                console.log('Nombre:', formData.get('nombre'));
                console.log('Edad:', formData.get('edad'));
                console.log('Sexo:', formData.get('sexo'));
                console.log('Intereses:', intereses);
                console.log('Email:', formData.get('email'));
                console.log('Curp:', formData.get('curp'));
                console.log('Nivel de estudios:', formData.get('estudios'));
                console.log('Teléfono:', formData.get('telefono'));
                
                // Mostrar mensaje de éxito
                successMessage.classList.add('show');
                form.reset();
                
                // Limpiar clases de validación
                document.querySelectorAll('.valid').forEach(el => el.classList.remove('valid'));
                
                // Ocultar mensaje después de 3 segundos
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 3000);
            } else {
                console.log('Formulario inválido. Por favor corrige los errores.');
            }
        });