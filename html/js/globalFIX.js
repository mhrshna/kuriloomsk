

    (() => {
      const desc = Object.getOwnPropertyDescriptor(Image.prototype, 'src');
      if (!desc || !desc.set || !desc.get) return;

      const origGet = desc.get;
      const origSet = desc.set;

      // Гашу все курсоры Яндекс.Карт, включая zoom_in.cur
      const CURSOR_RE = /\/build\/release\/images\/cursor\/(grab|grabbing|help|zoom_in)\.cur(?:[?#].*)?$/i;
      const EMPTY_ICON = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

      const rules = [
        { re: /^\/?tiles\?l=map/i, prefix: 'https://vec.maps.yandex.net/' },
        { re: /^\/?tiles\?l=(sat|sat,skl)/i, prefix: 'https://sat01.maps.yandex.net/' }
      ];

      function rewrite(value) {
        try {
          if (value == null) return value;
          let v = String(value);
          if (/^(data:|blob:|about:)/i.test(v)) return value;
          if (CURSOR_RE.test(v)) return EMPTY_ICON;
          for (const r of rules) {
            if (r.re.test(v)) {
              if (v.startsWith('/')) v = v.slice(1);
              return r.prefix + v;
            }
          }
          return value;
        } catch {
          return value;
        }
      }

      Object.defineProperty(Image.prototype, 'src', {
        configurable: true,
        enumerable: desc.enumerable,
        get() { return origGet.call(this); },
        set(value) { return origSet.call(this, rewrite(value)); }
      });
    })();



    (function () {
      // что считаем «плохим» и чем заменяем
      const BAD = /(^|\/)img\/svg\/maps-and-flags\.svg(\?|#|$)/i;
      const GOOD = './KuriloOmsk_files/maps-and-flags.svg';

      // 1) перехват Image.src (даже если ставят напрямую: n.image.src = e)
      const imgDesc = Object.getOwnPropertyDescriptor(Image.prototype, 'src');
      Object.defineProperty(Image.prototype, 'src', {
        set(value) {
          if (typeof value === 'string' && BAD.test(value)) value = GOOD;
          return imgDesc.set.call(this, value);
        },
        get: imgDesc.get
      });

      // 2) перехват setAttribute('src', '...')
      const nativeSetAttribute = Element.prototype.setAttribute;
      Element.prototype.setAttribute = function (name, value) {
        if ((name + '').toLowerCase() === 'src'
          && typeof value === 'string' && BAD.test(value)) {
          value = GOOD;
        }
        return nativeSetAttribute.call(this, name, value);
      };

      // 3) перехват new Image(...) — оставляем сигнатуру
      const NativeImage = window.Image;
      function PatchedImage(width, height) {
        const img = new NativeImage(width, height);
        return img;
      }
      PatchedImage.prototype = NativeImage.prototype;
      window.Image = PatchedImage;


      function fixExisting() {
        document.querySelectorAll('img[src]').forEach(img => {
          const s = img.getAttribute('src');
          if (s && BAD.test(s)) img.setAttribute('src', GOOD);
        });
      }
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixExisting);
      } else {
        fixExisting();
      }
    })();
