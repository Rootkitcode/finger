/* global jasmine, describe, spyOn, it, expect, n21pay_fing2 */
'use strict'

function getComponent (components, key) {
  for (var x = 0; x < components.length; x++) {
    if (components[x].key === key) {
      return components[x].value
    }
  }
  throw new Error('Component not found: ' + key)
}

var onPhantomJs = window._phantom != null

describe('n21pay_fing2', function () {
  describe('new', function () {
    it('creates a new instance of bfp2', function () {
      expect(new n21pay_fing2()).not.toBeNull()
    })

    it('accepts an empty options object', function () {
      expect(new n21pay_fing2({})).not.toBeNull()
    })

    it('uses default options', function () {
      var bfp2 = new n21pay_fing2()
      expect(bfp2.options.swfContainerId).toEqual('Boofingerjs2')
      expect(bfp2.options.swbfpath).toEqual('flash/compiled/FontList.swf')
      expect(bfp2.options.userDefinedFonts).toEqual([])
    })

    it('allows to override default options', function () {
      var bfp2 = new n21pay_fing2({swbfpath: 'newpath', userDefinedFonts: ['Ethos', 'Quenda']})
      expect(bfp2.options.swfContainerId).toEqual('Boofingerjs2')
      expect(bfp2.options.swbfpath).toEqual('newpath')
      expect(bfp2.options.userDefinedFonts).toEqual(['Ethos', 'Quenda'])
    })

    it('allows to add new options', function () {
      var bfp2 = new n21pay_fing2({excludeUserAgent: true})
      expect(bfp2.options.swfContainerId).toEqual('Boofingerjs2')
      expect(bfp2.options.swbfpath).toEqual('flash/compiled/FontList.swf')
      expect(bfp2.options.excludeUserAgent).toBe(true)
    })

    describe('sortPluginsFor', function () {
      it('has default value', function () {
        var bfp2 = new n21pay_fing2()
        expect(bfp2.options.sortPluginsFor).toEqual([/palemoon/i])
      })

      it('allows to set new array of regexes', function () {
        var bfp2 = new n21pay_fing2({sortPluginsFor: [/firefox/i, /chrome/i]})
        expect(bfp2.options.sortPluginsFor).toEqual([/firefox/i, /chrome/i])
      })
    })
  })

  describe('without new keyword', function () {
    it('creates a new instance of bfp2', function () {
      expect(n21pay_fing2()).not.toBeNull()
    })
  })

  describe('get', function () {
    describe('default options', function () {
      it('calculates Boofinger', function (done) {
        var bfp2 = new n21pay_fing2()
        bfp2.get(function (result) {
          expect(result).toMatch(/^[0-9a-f]{32}$/i)
          done()
        })
      })

      it('does not try calling flash font detection', function (done) {
        var bfp2 = new n21pay_fing2()
        spyOn(bfp2, 'flashFontsKey')
        bfp2.get(function (result) {
          expect(bfp2.flashFontsKey).not.toHaveBeenCalled()
          done()
        })
      })
    })

    describe('non-default options', function () {
      it('does not use userAgent when excluded', function (done) {
        var bfp2 = new n21pay_fing2({excludeUserAgent: true})
        spyOn(bfp2, 'getUserAgent')
        bfp2.get(function (result) {
          expect(bfp2.getUserAgent).not.toHaveBeenCalled()
          done()
        })
      })

      it('does not use pixelRatio when excluded', function (done) {
        var bfp2 = new n21pay_fing2({excludePixelRatio: true})
        spyOn(bfp2, 'getPixelRatio')
        bfp2.get(function (result) {
          expect(bfp2.getPixelRatio).not.toHaveBeenCalled()
          done()
        })
      })

      it('does not use deviceMemory when excluded', function (done) {
        var bfp2 = new n21pay_fing2({excludeDeviceMemory: true})
        spyOn(bfp2, 'getDeviceMemory')
        bfp2.get(function (result) {
          expect(bfp2.getDeviceMemory).not.toHaveBeenCalled()
          done()
        })
      })

      it('does not use screen resolution when excluded', function (done) {
        var bfp2 = new n21pay_fing2({excludeScreenResolution: true})
        spyOn(bfp2, 'getScreenResolution')
        bfp2.get(function (result) {
          expect(bfp2.getScreenResolution).not.toHaveBeenCalled()
          done()
        })
      })

      it('does not use available screen resolution when excluded', function (done) {
        var bfp2 = new n21pay_fing2({excludeAvailableScreenResolution: true})
        spyOn(bfp2, 'getAvailableScreenResolution')
        bfp2.get(function (result) {
          expect(bfp2.getAvailableScreenResolution).not.toHaveBeenCalled()
          done()
        })
      })

      it('does not use plugins info when excluded', function (done) {
        var bfp2 = new n21pay_fing2({excludePlugins: true})
        spyOn(bfp2, 'getRegularPlugins')
        bfp2.get(function (result) {
          expect(bfp2.getRegularPlugins).not.toHaveBeenCalled()
          done()
        })
      })

      it('does not use IE plugins info when excluded', function (done) {
        var bfp2 = new n21pay_fing2({excludeIEPlugins: true})
        spyOn(bfp2, 'getIEPlugins')
        bfp2.get(function (result) {
          expect(bfp2.getIEPlugins).not.toHaveBeenCalled()
          done()
        })
      })

      it('does not use timezone when excluded', function (done) {
        var bfp2 = new n21pay_fing2({excludeTimezone: true})
        bfp2.get(function (result, components) {
          expect(components).not.toContain(jasmine.objectContaining({"key": "timezone"}))
          done()
        })
      })
    })

    describe('returns components', function () {
      it('does it return components as a second argument to callback', function (done) {
        var bfp2 = new n21pay_fing2()
        bfp2.get(function (result, components) {
          expect(components).not.toBeNull()
          done()
        })
      })

      it('checks if returned components is array', function (done) {
        var bfp2 = new n21pay_fing2()
        bfp2.get(function (result, components) {
          expect(components).toBeArrayOfObjects()
          done()
        })
      })

      it('checks if js_fonts component is array', function (done) {
        (new n21pay_fing2()).get(function (_, components) {
          expect(getComponent(components, 'js_fonts')).toBeArray()
          done()
        })
      })

      it('returns user_agent as the first element', function (done) {
        var bfp2 = new n21pay_fing2()
        bfp2.get(function (result, components) {
          expect(components[0].key).toEqual('user_agent')
          done()
        })
      })
    })

    describe('baseFontArray iteration', function () {
      it('only iterates specified items', function (done) {
        var baseFonts = ['monospace', 'sans-serif', 'serif']
        // eslint-disable-next-line
        var ctr = 0; for (var _ in baseFonts) { ctr++ }

        expect(baseFonts.length).toEqual(3)
        expect(ctr).toEqual(baseFonts.length)

        // Somewhere deep in your JavaScript library...
        // eslint-disable-next-line
        Array.prototype.foo = 1
        // eslint-disable-next-line
        Array.prototype.bar = 2
        // eslint-disable-next-line
        ctr = 0; for (var _ in baseFonts) {
          ctr++
          // Now foo & bar is a part of EVERY array and
          // will show up here as a value of 'x'.
        }

        expect(baseFonts.length).toEqual(3)
        // sadface
        expect(ctr).not.toEqual(baseFonts.length)
        expect(ctr).toEqual(5)
        done()
      })
    })

    describe('userDefinedFonts option', function () {
      it('concatinates existing fonts with user-defined', function (done) {
        var fontList = [
          'Andale Mono', 'Arial', 'Arial Black', 'Arial Hebrew', 'Arial MT', 'Arial Narrow', 'Arial Rounded MT Bold',
          'Arial Unicode MS',
          'Bitstream Vera Sans Mono', 'Book Antiqua', 'Bookman Old Style',
          'Calibri', 'Cambria', 'Cambria Math', 'Century', 'Century Gothic', 'Century Schoolbook', 'Comic Sans',
          'Comic Sans MS', 'Consolas', 'Courier', 'Courier New',
          'Garamond', 'Geneva', 'Georgia',
          'Helvetica', 'Helvetica Neue',
          'Impact',
          'Lucida Bright', 'Lucida Calligraphy', 'Lucida Console', 'Lucida Fax', 'LUCIDA GRANDE', 'Lucida Handwriting',
          'Lucida Sans', 'Lucida Sans Typewriter', 'Lucida Sans Unicode',
          'Microsoft Sans Serif', 'Monaco', 'Monotype Corsiva', 'MS Gothic', 'MS Outlook', 'MS PGothic',
          'MS Reference Sans Serif', 'MS Sans Serif', 'MS Serif', 'MYRIAD', 'MYRIAD PRO',
          'Palatino', 'Palatino Linotype',
          'Segoe Print', 'Segoe Script', 'Segoe UI', 'Segoe UI Light', 'Segoe UI Semibold', 'Segoe UI Symbol',
          'Tahoma', 'Times', 'Times New Roman', 'Times New Roman PS', 'Trebuchet MS',
          'Verdana', 'Wingdings', 'Wingdings 2', 'Wingdings 3'
        ]

        expect(fontList.length).toEqual(65)
        var userDefinedFonts = []
        fontList.concat(userDefinedFonts)
        expect(fontList.length).toEqual(65)

        userDefinedFonts = ['Adria Grotesk', 'Butler', 'Nimbus Mono', 'Arial', 'Nimbus Mono']
        expect(userDefinedFonts.length).toEqual(5)
        fontList = fontList.concat(userDefinedFonts)

        // remove duplicate fonts: "Arial" from default fonts & duplicate "Nimbus Mono" from `userDefinedFonts` variable.
        fontList = fontList.filter(function (font, position) {
          return fontList.indexOf(font) === position
        })

        expect(fontList.length).toEqual(65 + 5 - 2)
        done()
      })
    })
    describe('customFunction option', function () {
      it('concatinates the current keys with the customFunction output', function (done) {
        function customFunction () {
          return 'RANDOM_STRING'
        }
        var spy = jasmine.createSpy('customFunction', customFunction).and.callThrough()
        var bfp = new n21pay_fing2({
          'customFunction': spy
        })
        bfp.get(function (result, keys) {
          expect(spy).toHaveBeenCalled()
          done()
        })
      })
      it('with customKey option changes the key', function (done) {
        var bfp = new n21pay_fing2({
          customFunction: function () {
            return 'RANDOM_STRING'
          },
          customKey: 'TEST_STRING'
        })
        bfp.get(function (_, components) {
          expect(getComponent(components, 'TEST_STRING')).toEqual('RANDOM_STRING')
          done()
        })
      })
    })

    if (!onPhantomJs) {
      describe('enumerate devices Boofinger', function () {
        it('checks enumerate devices Boofinger', function (done) {
          var bfp2 = new n21pay_fing2(); 
          bfp2.get(function (_, components) {
            if(bfp2.isEnumerateDevicesSupported())
              expect(getComponent(components, 'enumerate_devices')).not.toBeNull()
            done()
          })
        })
      })
    }

    if (!onPhantomJs) {
      describe('audio Boofinger', function () {
        it('checks audio Boofinger', function (done) {
          (new n21pay_fing2()).get(function (_, components) {
            expect(getComponent(components, 'audio_bfp')).not.toBeNull()
            done()
          })
        })
      })
    }

    if (!onPhantomJs) {
      describe('webgl shader precision format', function () {
        it('checks webgl shader precision format loop', function (done) {
          var bfp2 = new n21pay_fing2()
          var gl = bfp2.getWebglCanvas()
          var item = function (name, descr, attr1, attr2, attr3) {
            var fmt = gl.getShaderPrecisionFormat(attr1, attr2)[attr3]
            return ['webgl ', name, ' shader ', descr, ':', fmt].join('')
          }
          var webglExpectedArray = [ /* eslint-disable */
            item('vertex'  , 'high float precision'           , gl.VERTEX_SHADER  , gl.HIGH_FLOAT  , 'precision'),
            item('vertex'  , 'high float precision rangeMin'  , gl.VERTEX_SHADER  , gl.HIGH_FLOAT  , 'rangeMin'),
            item('vertex'  , 'high float precision rangeMax'  , gl.VERTEX_SHADER  , gl.HIGH_FLOAT  , 'rangeMax'),
            item('vertex'  , 'medium float precision'         , gl.VERTEX_SHADER  , gl.MEDIUM_FLOAT, 'precision'),
            item('vertex'  , 'medium float precision rangeMin', gl.VERTEX_SHADER  , gl.MEDIUM_FLOAT, 'rangeMin'),
            item('vertex'  , 'medium float precision rangeMax', gl.VERTEX_SHADER  , gl.MEDIUM_FLOAT, 'rangeMax'),
            item('vertex'  , 'low float precision'            , gl.VERTEX_SHADER  , gl.LOW_FLOAT   , 'precision'),
            item('vertex'  , 'low float precision rangeMin'   , gl.VERTEX_SHADER  , gl.LOW_FLOAT   , 'rangeMin'),
            item('vertex'  , 'low float precision rangeMax'   , gl.VERTEX_SHADER  , gl.LOW_FLOAT   , 'rangeMax'),
            item('vertex'  , 'high int precision'             , gl.VERTEX_SHADER  , gl.HIGH_INT    , 'precision'),
            item('vertex'  , 'high int precision rangeMin'    , gl.VERTEX_SHADER  , gl.HIGH_INT    , 'rangeMin'),
            item('vertex'  , 'high int precision rangeMax'    , gl.VERTEX_SHADER  , gl.HIGH_INT    , 'rangeMax'),
            item('vertex'  , 'medium int precision'           , gl.VERTEX_SHADER  , gl.MEDIUM_INT  , 'precision'),
            item('vertex'  , 'medium int precision rangeMin'  , gl.VERTEX_SHADER  , gl.MEDIUM_INT  , 'rangeMin'),
            item('vertex'  , 'medium int precision rangeMax'  , gl.VERTEX_SHADER  , gl.MEDIUM_INT  , 'rangeMax'),
            item('vertex'  , 'low int precision'              , gl.VERTEX_SHADER  , gl.LOW_INT     , 'precision'),
            item('vertex'  , 'low int precision rangeMin'     , gl.VERTEX_SHADER  , gl.LOW_INT     , 'rangeMin'),
            item('vertex'  , 'low int precision rangeMax'     , gl.VERTEX_SHADER  , gl.LOW_INT     , 'rangeMax'),
            item('fragment', 'high float precision'           , gl.FRAGMENT_SHADER, gl.HIGH_FLOAT  , 'precision'),
            item('fragment', 'high float precision rangeMin'  , gl.FRAGMENT_SHADER, gl.HIGH_FLOAT  , 'rangeMin'),
            item('fragment', 'high float precision rangeMax'  , gl.FRAGMENT_SHADER, gl.HIGH_FLOAT  , 'rangeMax'),
            item('fragment', 'medium float precision'         , gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT, 'precision'),
            item('fragment', 'medium float precision rangeMin', gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT, 'rangeMin'),
            item('fragment', 'medium float precision rangeMax', gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT, 'rangeMax'),
            item('fragment', 'low float precision'            , gl.FRAGMENT_SHADER, gl.LOW_FLOAT   , 'precision'),
            item('fragment', 'low float precision rangeMin'   , gl.FRAGMENT_SHADER, gl.LOW_FLOAT   , 'rangeMin'),
            item('fragment', 'low float precision rangeMax'   , gl.FRAGMENT_SHADER, gl.LOW_FLOAT   , 'rangeMax'),
            item('fragment', 'high int precision'             , gl.FRAGMENT_SHADER, gl.HIGH_INT    , 'precision'),
            item('fragment', 'high int precision rangeMin'    , gl.FRAGMENT_SHADER, gl.HIGH_INT    , 'rangeMin'),
            item('fragment', 'high int precision rangeMax'    , gl.FRAGMENT_SHADER, gl.HIGH_INT    , 'rangeMax'),
            item('fragment', 'medium int precision'           , gl.FRAGMENT_SHADER, gl.MEDIUM_INT  , 'precision'),
            item('fragment', 'medium int precision rangeMin'  , gl.FRAGMENT_SHADER, gl.MEDIUM_INT  , 'rangeMin'),
            item('fragment', 'medium int precision rangeMax'  , gl.FRAGMENT_SHADER, gl.MEDIUM_INT  , 'rangeMax'),
            item('fragment', 'low int precision'              , gl.FRAGMENT_SHADER, gl.LOW_INT     , 'precision'),
            item('fragment', 'low int precision rangeMin'     , gl.FRAGMENT_SHADER, gl.LOW_INT     , 'rangeMin'),
            item('fragment', 'low int precision rangeMax'     , gl.FRAGMENT_SHADER, gl.LOW_INT     , 'rangeMax'),
          ]

          bfp2.get(function (_, components) {
            bfp2.each(webglExpectedArray, function (item) {
              expect(getComponent(components, 'webgl').indexOf(item)).not.toEqual(-1)
            })
            done()
          })
        })
      })
    }

    describe('preprocessor', function () {
      it('checks that preprocessor not used by default', function (done) {
        (new n21pay_fing2()).get(function (_, components) {
          expect(getComponent(components, 'user_agent')).not.toEqual('MyUserAgent')
          done()
        })
      })

      it('checks that preprocessor function applied to component value', function (done) {
        var options = {
          preprocessor: function (key, value) {
            if (key === 'user_agent') {
              value = 'MyUserAgent'
            }
            return value
          }
        }
        var bfp2 = new n21pay_fing2(options)
        bfp2.get(function (_, components) {
          expect(getComponent(components, 'user_agent')).toEqual('MyUserAgent')
          done()
        })
      })
    })

  })
})
