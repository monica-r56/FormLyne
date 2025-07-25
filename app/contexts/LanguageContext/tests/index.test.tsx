import { useContext } from 'react';
import { fireEvent, render, screen } from '@utils/testHelpers';
import { DEFAULT_LOCALE } from '@utils/intl';
import { LanguageContext, LanguageContextInterfaceWithHandleChange, LanguageProvider } from '../index';

describe('LanguageProvider', () => {
  const TestComponent = () => {
    const { locale } = useContext(LanguageContext);
    const context = useContext(LanguageContext) as LanguageContextInterfaceWithHandleChange;
    const changeLanguage = 'Change Language';
    return (
      <div>
        <span data-testid="locale">{locale}</span>
        {context.handleChangeLanguage && (
          <button
            onClick={() => context.handleChangeLanguage(locale === 'en' ? 'es' : 'en')}
            data-testid="change-language-btn"
          >
            {changeLanguage}
          </button>
        )}
      </div>
    );
  };

  it('should render with the default locale and change language on button click', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );

    // Check if the default language (DEFAULT_LOCALE) is rendered
    const localeSpan = screen.getByTestId('locale');
    expect(localeSpan.textContent).toBe(DEFAULT_LOCALE);

    // Trigger language change
    const changeLanguageBtn = screen.getByTestId('change-language-btn');
    fireEvent.click(changeLanguageBtn);

    // After click, check if the language changes
    expect(localeSpan.textContent).toBe('es');

    // Trigger another change back to 'en'
    fireEvent.click(changeLanguageBtn);
    expect(localeSpan.textContent).toBe('en');
  });
});
