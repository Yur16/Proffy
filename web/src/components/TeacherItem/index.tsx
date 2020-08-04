import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars2.githubusercontent.com/u/45566439?s=460&u=3fd5a4801a016fbf8f33823d7b049926a98ddfb6&v=4" alt="Yuri Oliveira" />
        <div>
          <strong>Yuri OLivera</strong>
          <span>Matemática</span>
        </div>
      </header>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisi urna, viverra ut urna vel, pellentesque luctus elit.
        <br /><br />
        Vestibulum fermentum tristique cursus. Donec at dui tortor. Vestibulum sit amet accumsan sapien. In sit amet turpis elit. Donec volutpat, orci quis elementum iaculis, ante urna semper ante, pellentesque tempor ligula nisi a metus.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 80,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="whatsapp" />
            Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;