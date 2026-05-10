import React from 'react'
import { Info, Heart } from 'lucide-react'
import { useTranslation } from '../../i18n'
import Section from './Section'

interface Props {
  appVersion: string
}

export default function AboutTab({ appVersion }: Props): React.ReactElement {
  const { t } = useTranslation()

  return (
    <Section title={t('settings.about')} icon={Info}>
      <style>{`
        @keyframes heartPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}</style>
      <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: 6, marginTop: -4 }}>
        {t('settings.about.description')}
      </p>
      <p style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--text-faint)', marginBottom: 16 }}>
        {t('settings.about.madeWith')}{' '}
        <Heart size={11} fill="#991b1b" stroke="#991b1b" style={{ display: 'inline-block', verticalAlign: '-1px', animation: 'heartPulse 1.5s ease-in-out infinite' }} />
        {' '}{t('settings.about.madeBy')}{' '}
        <span style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--bg-tertiary)', borderRadius: 99, padding: '1px 7px', fontSize: 10, fontWeight: 600, color: 'var(--text-faint)', verticalAlign: '1px' }}>v{appVersion}</span>
      </p>

      <div className="mt-6 border-t border-dashed border-primary/10 pt-6">
        <p className="text-xs text-faint italic text-center">
          {t('common.version')} {appVersion}
        </p>
      </div>
    </Section>
  )
}
