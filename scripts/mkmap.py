# Daytona Beach vector base map from Census TIGER (Volusia County water + roads) -> one static SVG.
import shapefile, sys, math
d, out = sys.argv[1], sys.argv[2]
LON0, LAT0, LON1, LAT1 = -81.100, 29.170, -80.980, 29.300
W = 600.0
kx = math.cos(math.radians((LAT0 + LAT1) / 2))
H = W * (LAT1 - LAT0) / ((LON1 - LON0) * kx)
def P(lon, lat):
    x = (lon - LON0) / (LON1 - LON0) * W; y = (LAT1 - lat) / (LAT1 - LAT0) * H
    return (max(-40, min(W + 40, x)), max(-40, min(H + 40, y)))
def dp(pts, eps):
    if len(pts) < 3: return pts
    (x1, y1), (x2, y2) = pts[0], pts[-1]; dx, dy = x2 - x1, y2 - y1; L = math.hypot(dx, dy) or 1e-9
    imax, dmax = 0, 0
    for i in range(1, len(pts) - 1):
        dd = abs(dy * pts[i][0] - dx * pts[i][1] + x2 * y1 - y2 * x1) / L
        if dd > dmax: imax, dmax = i, dd
    if dmax <= eps: return [pts[0], pts[-1]]
    return dp(pts[:imax + 1], eps)[:-1] + dp(pts[imax:], eps)
def ring(pts, eps):
    far = max(range(len(pts)), key=lambda i: (pts[i][0] - pts[0][0]) ** 2 + (pts[i][1] - pts[0][1]) ** 2)
    if far == 0: return pts
    return dp(pts[:far + 1], eps)[:-1] + dp(pts[far:], eps)
def area(p): return abs(sum(p[i][0] * p[(i + 1) % len(p)][1] - p[(i + 1) % len(p)][0] * p[i][1] for i in range(len(p)))) / 2
def path(pts, close=False): return 'M' + 'L'.join(f'{x:.1f} {y:.1f}' for x, y in pts) + ('Z' if close else '')
def inb(bb): return not (bb[2] < LON0 or bb[0] > LON1 or bb[3] < LAT0 or bb[1] > LAT1)
import sys; sys.setrecursionlimit(100000)
water = []
for sr in shapefile.Reader(d + '/tl_2024_12127_areawater/tl_2024_12127_areawater.shp').iterShapeRecords():
    if not inb(sr.shape.bbox): continue
    parts = list(sr.shape.parts) + [len(sr.shape.points)]
    for a, b in zip(parts, parts[1:]):
        pts = [P(*p) for p in sr.shape.points[a:b]]
        # drop runs of identical clamped points
        q = [pts[0]] + [p for i, p in enumerate(pts[1:]) if p != pts[i]]
        if len(q) < 4: continue
        q = ring(q, 0.5)
        if len(q) >= 3 and area(q) > 5: water.append(path(q, True))
roads = {'local': [], 'major': [], 'hwy': []}
for sr in shapefile.Reader(d + '/tl_2024_12127_roads/tl_2024_12127_roads.shp').iterShapeRecords():
    if not inb(sr.shape.bbox): continue
    m = sr.record.as_dict()['MTFCC']
    k = 'hwy' if m == 'S1100' else 'major' if m == 'S1200' else 'local' if m == 'S1400' else None
    if not k: continue
    parts = list(sr.shape.parts) + [len(sr.shape.points)]
    for a, b in zip(parts, parts[1:]):
        pts = dp([P(*p) for p in sr.shape.points[a:b]], 0.5 if k != 'local' else 0.8)
        if len(pts) >= 2: roads[k].append(path(pts))
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H:.0f}">
<rect width="{W:.0f}" height="{H:.0f}" fill="#123a28"/>
<path d="{''.join(roads['local'])}" fill="none" stroke="#d2a43a" stroke-opacity=".2" stroke-width=".7" stroke-linecap="round"/>
<path d="{''.join(water)}" fill="#06160f" fill-rule="evenodd" stroke="#d2a43a" stroke-opacity=".55" stroke-width=".8"/>
<path d="{''.join(roads['major'])}" fill="none" stroke="#d2a43a" stroke-opacity=".75" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
<path d="{''.join(roads['hwy'])}" fill="none" stroke="#f3d98a" stroke-width="2.6" stroke-linecap="round"/>
</svg>'''
open(out, 'w').write(svg)
print(f'W {W:.0f} H {H:.1f} bytes {len(svg)} water {len(water)} roads', {k: len(v) for k, v in roads.items()})
for n, lon, lat in [('park', -81.029633, 29.270806), ('carwash', -81.040072, 29.203445), ('north316', -81.029024, 29.221657)]:
    print(n, [round(v, 1) for v in P(lon, lat)])
