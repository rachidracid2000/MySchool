// declarations.d.ts
declare module 'react-native-vector-icons/FontAwesome';
// app/utils/routes.ts
// app/utils/routes.ts
export function getDestinationPath(dest: 'note' | 'absence') {
    if (dest === 'note') return '/src/Firstpage/Enseignant/note' as const;
    if (dest === 'absence') return '/src/Firstpage/Enseignant/classabsence' as const;
    return '/' as const; // fallback, optionnel
  }
  