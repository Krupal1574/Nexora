import sys
import codecs

css = """
.service-card {
  isolation: isolate;
  transition:
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.service-card::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.18),
    transparent 45%
  );
  opacity: 0;
  transition: opacity 400ms ease;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 50px rgba(23, 23, 23, 0.08);
}

.service-card:hover::after {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .service-card {
    transition: none;
  }

  .service-card:hover {
    transform: none;
  }
}
"""

with codecs.open(r'c:\Users\Krupa\Downloads\Nexora\nexora-site\app\globals.css', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

# The corrupted lines start after line 368
lines = lines[:368]

with codecs.open(r'c:\Users\Krupa\Downloads\Nexora\nexora-site\app\globals.css', 'w', encoding='utf-8') as f:
    f.writelines(lines)
    f.write('\n' + css + '\n')
