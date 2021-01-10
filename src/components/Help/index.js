import Popup from '~/components/Popup';

export default function Help() {
  return (
    <Popup title="Help" pos="topRight">
      <h2>Help</h2>
      <p>Enter equations into the input box, and +x+calc will give you answers.</p>
      <h4>Math operators:</h4>
      <p>+ - * / () ^ !</p>
      <h4>Unit operators:</h4>
      <p>in (determines the unit of the result)</p>
      <h4>Available units:</h4>
      <p>Length:	meter (m), inch (in), foot (ft), yard (yd), mile (mi), link (li), rod (rd), chain (ch), angstrom, mil</p>
      <p>Surface area:	m2, sqin, sqft, sqyd, sqmi, sqrd, sqch, sqmil, acre, hectare</p>
      <p>Volume: m3, litre (l, L, lt, liter), cc, cuin, cuft, cuyd, teaspoon, tablespoon</p>
      <p>Liquid volume: minim (min), fluiddram (fldr), fluidounce (floz), gill (gi), cup (cp), pint (pt), quart (qt), gallon (gal), beerbarrel (bbl), oilbarrel (obl), hogshead, drop (gtt)</p>
      <p>Angles: rad (radian), deg (degree), grad (gradian), cycle, arcsec (arcsecond), arcmin (arcminute)</p>
      <p>Time: second (s, secs, seconds), minute (mins, minutes), hour (h, hr, hrs, hours), day (days), week (weeks), month (months), year (years), decade (decades), century (centuries), millennium (millennia)</p>
      <p>Frequency: hertz (Hz)</p>
      <p>Mass: gram(g), tonne, ton, grain (gr), dram (dr), ounce (oz), poundmass (lbm, lb, lbs), hundredweight (cwt), stick, stone</p>
      <p>Electric current: ampere (A)</p>
      <p>Temperature: kelvin (K), celsius (degC), fahrenheit (degF), rankine (degR)</p>
      <p>Power: watt (W), hp</p>
    </Popup>
  );
}
